import React, { useState } from 'react';
import { Repo } from '../types/repo';
import { useGithubRepoAnalytics } from '../hooks/useGithubRepoAnalytics';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RepoListItemProps {
  repo: Repo;
}

function getCommitChartData(data: import('../types/repo').CommitActivityWeek[] | null) {
  if (!data) return [];
  return data.slice(-12).map((week) => ({
    week: new Date(week.week * 1000).toLocaleDateString(),
    commits: week.total,
  }));
}

const RepoListItem: React.FC<RepoListItemProps> = React.memo(({ repo }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { data, loading, error } = useGithubRepoAnalytics(repo.owner.login, repo.name);

  const chartData = getCommitChartData(data);

  return (
    <li className="repo-item">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`View ${repo.full_name} on GitHub`}>
        <div className="repo-header">
          <img src={repo.owner.avatar_url} alt={repo.owner.login} className="avatar" />
          <span className="repo-name">{repo.full_name}</span>
        </div>
        <div className="repo-desc">{repo.description}</div>
        <div className="repo-meta">
          ⭐ {repo.stargazers_count} by {repo.owner.login}
        </div>
      </a>
      <button
        className="analytics-toggle"
        onClick={() => setShowAnalytics((v) => !v)}
        aria-expanded={showAnalytics}
        aria-controls={`analytics-${repo.id}`}
        style={{ marginTop: 8 }}
      >
        {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
      </button>
      {showAnalytics && (
        <div id={`analytics-${repo.id}`} className="repo-analytics" style={{ marginTop: 12 }}>
          {loading && <div className="info">Loading analytics...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <XAxis dataKey="week" fontSize={12} angle={-45} textAnchor="end" height={50} />
                <YAxis fontSize={12} allowDecimals={false} width={40} />
                <Tooltip />
                <Line type="monotone" dataKey="commits" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
          {!loading && !error && chartData.length === 0 && (
            <div className="info">No analytics data available.</div>
          )}
        </div>
      )}
    </li>
  );
});

export default RepoListItem; 
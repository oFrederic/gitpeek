import { useState, useEffect } from 'react';
import { CommitActivityWeek } from '../types/repo';

export function useGithubRepoAnalytics(owner: string, repo: string) {
  const [data, setData] = useState<CommitActivityWeek[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;
    setLoading(true);
    setError(null);
    setData(null);
    fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch analytics');
        return res.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError('No analytics data available');
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [owner, repo]);

  return { data, loading, error };
} 
import React from 'react';
import { Repo } from '../types/repo';

interface RepoListItemProps {
  repo: Repo;
}

const RepoListItem: React.FC<RepoListItemProps> = React.memo(({ repo }) => (
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
  </li>
));

export default RepoListItem; 
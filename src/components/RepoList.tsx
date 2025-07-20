import React from 'react';
import { Repo } from '../types/repo';
import RepoListItem from './RepoListItem';

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <ul className="repo-list">
    {repos.map((repo) => (
      <RepoListItem key={repo.id} repo={repo} />
    ))}
  </ul>
);

export default RepoList; 
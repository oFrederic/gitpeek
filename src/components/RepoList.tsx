import React from 'react';
import { Repo } from '../types/repo';
import RepoListItem from './RepoListItem';
import styles from './RepoList.module.css';

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => (
  <ul className={styles.root}>
    {repos.map((repo) => (
      <RepoListItem key={repo.id} repo={repo} />
    ))}
  </ul>
);

export default RepoList; 
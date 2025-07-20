import React, { useState, useCallback } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RepoList from './components/RepoList';
import Pagination from './components/Pagination';
import { useGithubRepos } from './hooks/useGithubRepos';

const PER_PAGE = 10;

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { repos, loading, error, totalCount } = useGithubRepos(query, page);

  const handleSearch = useCallback((searchValue: string) => {
    setPage(1);
    setQuery(searchValue);
  }, []);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="github-search-app">
      <h1>GitHub Repository Search</h1>
      <SearchForm query={query} onSearch={handleSearch} />
      {loading && <div className="info">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && repos.length === 0 && query && (
        <div className="info">No results found.</div>
      )}
      <RepoList repos={repos} />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      )}
    </div>
  );
}

export default App;

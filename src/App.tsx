import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RepoList from './components/RepoList';
import Pagination from './components/Pagination';
import { useGithubRepos } from './hooks/useGithubRepos';
import infoStyles from './components/InfoMessage.module.css';
import themeToggleStyles from './components/ThemeToggle.module.css';

const PER_PAGE = 10;

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { repos, loading, error, totalCount } = useGithubRepos(query, page);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = useCallback((searchValue: string) => {
    setPage(1);
    setQuery(searchValue);
  }, []);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="github-search-app">
      <button
        className={themeToggleStyles.root}
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <h1>GitHub Repository Search</h1>
      <SearchForm query={query} onSearch={handleSearch} />
      {loading && <div className={infoStyles.info}>Loading...</div>}
      {error && <div className={infoStyles.error}>{error}</div>}
      {!loading && !error && repos.length === 0 && query && (
        <div className={infoStyles.info}>No results found.</div>
      )}
      {!loading && !error && !query && (
        <div className={infoStyles.info}>Start by entering a search term above. For example, try <strong>react</strong>.</div>
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

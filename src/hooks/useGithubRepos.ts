import { useState, useEffect } from 'react';
import { Repo } from '../types/repo';

const PER_PAGE = 10;

export function useGithubRepos(query: string, page: number) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!query) {
      setRepos([]);
      setTotalCount(0);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        setRepos(data.items || []);
        setTotalCount(data.total_count || 0);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  return { repos, loading, error, totalCount };
} 
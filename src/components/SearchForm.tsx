import React, { useRef } from 'react';

interface SearchFormProps {
  query: string;
  onSearch: (searchValue: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" role="search" aria-label="GitHub repository search">
      <input
        ref={inputRef}
        name="search"
        type="text"
        placeholder="Search repositories..."
        defaultValue={query}
        className="search-input"
        aria-label="Search repositories"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchForm; 
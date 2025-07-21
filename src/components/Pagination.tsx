import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => (
  <div className={styles.root} role="navigation" aria-label="Pagination">
    <button
      className={styles.button}
      onClick={onPrev}
      disabled={page === 1}
      aria-label="Previous page"
    >
      Previous
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button
      className={styles.button}
      onClick={onNext}
      disabled={page === totalPages}
      aria-label="Next page"
    >
      Next
    </button>
  </div>
);

export default Pagination; 
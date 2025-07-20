import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="pagination" role="navigation" aria-label="Pagination">
    <button
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
      onClick={onNext}
      disabled={page === totalPages}
      aria-label="Next page"
    >
      Next
    </button>
  </div>
);

export default Pagination; 
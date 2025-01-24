import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState(5);

 
  const updateVisiblePages = () => {
    if (window.innerWidth < 640) {
      setVisiblePages(3); 
    } else {
      setVisiblePages(5); 
    }
  };


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  
  React.useEffect(() => {
    updateVisiblePages();
    window.addEventListener('resize', updateVisiblePages);

    return () => {
      window.removeEventListener('resize', updateVisiblePages);
    };
  }, []);

 
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i >= currentPage - Math.floor(visiblePages / 2) &&
      i <= currentPage + Math.floor(visiblePages / 2)
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2 bg-blue-600 text-white rounded-l-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`p-2 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg mx-1`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 bg-blue-600 text-white rounded-r-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

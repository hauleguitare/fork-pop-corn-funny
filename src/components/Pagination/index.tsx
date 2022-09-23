import usePagination from '@src/hooks/usePagination';
import * as React from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

interface IPaginationProps {
  onPageChange: (Page: number) => void;
  totalPages: number;
  siblingCount: number;
  currentPage: number;
  className?: string;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  const { totalPages, siblingCount = 2, currentPage = 1, onPageChange, className } = props;
  const [paginationRange] = usePagination({ totalPages, siblingCount, currentPage });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={className}>
      <li className="flex items-center">
        <button
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          onClick={onPrevious}
        >
          <GrPrevious className="w-full h-full" />
        </button>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === 'left...' || pageNumber === '...right') {
          return <li key={pageNumber}>...</li>;
        }
        return (
          <li
            key={pageNumber}
            className={`${
              currentPage === pageNumber ? 'bg-stone-light-chocolate text-black scale-110' : 'text-white'
            } hover:bg-stone-light-chocolate/80 duration-150 ease-linear flex items-center px-2 py-2 active:ring-2 text-base up-mobile:text-lg font-roboto font-bold rounded-md`}
          >
            <button
              onClick={() => {
                onPageChange(Number(pageNumber));
              }}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li className="flex items-center">
        <button
          disabled={currentPage === totalPages}
          onClick={onNext}
          className={`${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
        >
          <GrNext className="w-full h-full" />
        </button>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  className: '',
};

export default Pagination;

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={` ${
            currentPage === i ? 'bg-custom-primary-1 text-white' : 'border'
          }  py-2 px-4 rounded-lg  hover:bg-gray-300`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className={` hover:bg-gray-200 text-black border font-bold py-2 px-4 rounded-lg ${
          isPreviousDisabled && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
      >
        <FiChevronLeft />
      </button>


{renderPageButtons()}

      <button
        className={` hover:bg-gray-200 text-black border font-bold py-2 px-4 rounded-lg ${
          isNextDisabled && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isNextDisabled}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

import { Button } from "@/components/ui/button";

const PaginationControls = ({
  currentPage,
  totalPage,
  setPage,
}: {
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
}) => {
  if (totalPage <= 1) return null;

  const maxVisiblePages = 10; // how many page buttons to show at once

  // Calculate the range of page numbers to show
  const getPageRange = () => {
    const start =
      Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const end = Math.min(start + maxVisiblePages - 1, totalPage);
    return { start, end };
  };

  const { start, end } = getPageRange();

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-1 mt-6 flex-wrap items-center pb-16">
      {/* Prev Button */}
      <Button
        className="cursor-pointer"
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Prev
      </Button>

      {/* First Page + Ellipsis */}
      {start > 1 && (
        <>
          <Button
            className="cursor-pointer"
            size="sm"
            variant={currentPage === 1 ? "default" : "outline"}
            onClick={() => setPage(1)}
          >
            1
          </Button>
          {start > 2 && <span className="px-2 select-none">...</span>}
        </>
      )}

      {/* Page Number Buttons */}
      {pages.map((p) => (
        <Button
          className={`cursor-pointer ${p === currentPage && 'bg-[#104042]'}`}
          key={p}
          variant={p === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ))}

      {/* Last Page + Ellipsis */}
      {end < totalPage && (
        <>
          {end < totalPage - 1 && <span className="px-2 select-none">...</span>}
          <Button
            className="cursor-pointer"
            size="sm"
            variant={currentPage === totalPage ? "default" : "outline"}
            onClick={() => setPage(totalPage)}
          >
            {totalPage}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        className="cursor-pointer"
        size="sm"
        variant="outline"
        disabled={currentPage === totalPage}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;

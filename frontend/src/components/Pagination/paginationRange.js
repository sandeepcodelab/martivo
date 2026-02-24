//Calculate pagination range start and end
export const getPaginationRange = (page, totalPages, windowSize = 5) => {
  const half = Math.floor(windowSize / 2);

  let start = page - half;
  let end = page + half;

  if (start < 1) {
    start = 1;
    end = windowSize;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - windowSize + 1;
  }

  if (start < 1) start = 1;

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

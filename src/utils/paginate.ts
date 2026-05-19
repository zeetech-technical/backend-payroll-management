// export interface PaginationLink {
//   url: string | null;
//   label: string | number;
//   active: boolean;
//   page: number | null;
// }

export interface PaginationResult {
  page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  // links: PaginationLink[];
  // next_page_url: string | null;
  // prev_page_url: string | null;
  per_page: number;
  to: number;
  total: number;
}

export function getPagination(
  page: number | string,
  perPage: number | string,
  total: number | string,
): PaginationResult {
  const currentPage = Number(page) || 1;
  const qty = Number(perPage) || 10;
  const totalItems = Number(total) || 0;

  const lastPage = Math.max(1, Math.ceil(totalItems / qty));

  const safePage = Math.min(Math.max(currentPage, 1), lastPage);

  const from = totalItems === 0 ? 0 : (safePage - 1) * qty + 1;
  const to = Math.min(safePage * qty, totalItems);

  // const prevPage = safePage > 1 ? safePage - 1 : null;
  // const nextPage = safePage < lastPage ? safePage + 1 : null;

  // const buildUrl = (p: number | null) => (p ? `/?page=${p}` : null);

  // 🔥 Ventana de páginas (evita loops grandes)
  const windowSize = 5;
  let start = Math.max(1, safePage - Math.floor(windowSize / 2));
  let end = Math.min(lastPage, start + windowSize - 1);

  if (end - start < windowSize - 1) {
    start = Math.max(1, end - windowSize + 1);
  }

  // const links: PaginationLink[] = [];

  // Previous
  // links.push({
  //   url: buildUrl(prevPage),
  //   label: "« Previous",
  //   active: false,
  //   page: prevPage,
  // });

  // Page numbers (windowed)
  // for (let i = start; i <= end; i++) {
  //   links.push({
  //     url: buildUrl(i),
  //     label: i,
  //     active: i === safePage,
  //     page: i,
  //   });
  // }

  // Next
  // links.push({
  //   url: buildUrl(nextPage),
  //   label: "Next »",
  //   active: false,
  //   page: nextPage,
  // });

  return {
    page: safePage,
    first_page_url: "/?page=1",
    from,
    last_page: lastPage,
    // links,
    // next_page_url: buildUrl(nextPage),
    // prev_page_url: buildUrl(prevPage),
    per_page: qty,
    to,
    total: totalItems,
  };
}

interface Pagination {
  total?: number;
  page?: number;
  perPage?: number;
  totalPages?: number;
}

export const sendResponse = (
  res: any,
  data: any,
  message = "",
  success = true,
  meta?: Pagination
) => {
  return res.json({
    success,
    data,
    message,
    ...(meta ? { meta } : {}),
  });
};
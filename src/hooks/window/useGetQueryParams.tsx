export const useGetQueryParams = () => {
  const queryParams = new URLSearchParams(window.location.search)

  return queryParams;
}
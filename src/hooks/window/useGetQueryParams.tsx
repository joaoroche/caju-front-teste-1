import { useLocation } from 'react-router-dom';

interface QueryParams {
  [key: string]: string | null; 
}

export const useGetQueryParams = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const params: QueryParams = {};
  for (const [key, value] of queryParams.entries()) {
    params[key] = value;
  }

  const getParam = (key: string): string | null => {
    return queryParams.get(key);
  };

  return { params, getParam };
};
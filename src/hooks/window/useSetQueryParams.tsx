import { useHistory } from "react-router-dom";

export const useSetQueryParams = () => {
  const history = useHistory();

  return {
    mutate: ({ key, value }: { key: string; value: any }) => {
      const query = new URLSearchParams(window.location.search);

      query.set(key, value);

      history.push({
        search: query.toString(),
      });
    },
  };
};

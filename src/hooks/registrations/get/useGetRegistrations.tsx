import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { ReturnGetRegistrations } from "~/@types/registrations/get";
import { getRegistrations } from "~/services/registrations/get";
import { GetRegistrationsParams } from "~/services/registrations/get/getRegistrationsType";

export const useGetRegistrations = ({ params }: GetRegistrationsParams) => {
  const [data, setData] = useState<ReturnGetRegistrations['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const isError = !!error;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      await getRegistrations({ params })
      .then(({ data }) => {
        setData(data);
      }).catch((error: AxiosError) => {
        setError(error);
      }).finally(() => {
        setLoading(false);
      })
    };

    fetchData();
  }, [params?.cpf]);

  return { data, loading, error, isError };
};

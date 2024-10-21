import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { putRegistrations } from "~/services/registrations/put";

import { PutRegistrationsParams } from "~/services/registrations/put/putRegistrationsType";

interface MutateAsyncProps extends PutRegistrationsParams {
  onSuccess?: () => void;
}



export const usePutRegistrations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isError = !!error;

  const mutateAsync = useCallback(async ({ payload, onSuccess }: MutateAsyncProps) => {
    setLoading(true);

    await putRegistrations({ payload })
    .then(() => {
      onSuccess && onSuccess();
      setIsSuccess(true);
    }).catch((error: AxiosError) => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    })
  }
  , []);

  return { isSuccess, isError, loading, error, mutateAsync };
};

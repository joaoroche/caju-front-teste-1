import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { postRegistrations } from "~/services/registrations/post";
import { PostRegistrationsParams } from "~/services/registrations/post/postRegistrationsType";

interface MutateAsyncProps extends PostRegistrationsParams {
  onSuccess?: () => void;
  onError?: () => void;
}

export const usePostRegistrations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isError = !!error;

  const mutateAsync = useCallback(async ({ payload, onSuccess, onError }: MutateAsyncProps) => {
    setLoading(true);

    await postRegistrations({ payload })
    .then(() => {
      onSuccess && onSuccess();
      setIsSuccess(true);
    }).catch((error: AxiosError) => {
      onError && onError();
      setError(error);
    }).finally(() => {
      setLoading(false);
    })
  }
  , []);

  return { isSuccess, isError, loading, error, mutateAsync };
};

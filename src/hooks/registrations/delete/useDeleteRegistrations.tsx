import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { deleteRegistrations } from "~/services/registrations/delete";
import { DeleteRegistrationsParams } from "~/services/registrations/delete/deleteRegistrationsType";

interface MutateAsyncProps extends DeleteRegistrationsParams {
  onSuccess?: () => void;
}

export const useDeleteRegistrations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isError = !!error;

  const mutateAsync = useCallback(async ({ id, onSuccess }: MutateAsyncProps) => {
    setLoading(true);

    await deleteRegistrations({ id })
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

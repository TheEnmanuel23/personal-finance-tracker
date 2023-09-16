import { useMutation, useQueryClient } from "react-query";
import fetcher from "../utils/fetcher";

export function useMutateTransaction(
  walletId: string,
  transactionId = "",
  callback: VoidFunction,
) {
  const queryClient = useQueryClient();

  let endpoint = `/transaction`;

  if (transactionId) endpoint += `/${transactionId}`;

  return useMutation(
    (data: unknown) =>
      fetcher({
        endpoint,
        type: transactionId ? "PUT" : "POST",
        authorized: true,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`wallet/${walletId}`);
        callback();
      },
    },
  );
}

export function useDeleteTransaction(
  id: string,
  walletId: string,
  callback: VoidFunction,
) {
  const queryClient = useQueryClient();
  const endpoint = `/transaction/${id}`;

  return useMutation(
    () =>
      fetcher({
        endpoint,
        type: "DELETE",
        authorized: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`wallet/${walletId}`);
        callback();
      },
    },
  );
}

import { useMutation, useQueryClient } from "react-query";
import fetcher from "../utils/fetcher";
import { useAuth } from "../hooks/use-auth";

export function useMutateWallet(wallet, callback: VoidFunction) {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const userId = auth?.data?.user.id;
  let endpoint = "/wallet";

  if (wallet) endpoint += `/${wallet.id}`;

  return useMutation(
    (data: {}) =>
      fetcher({
        endpoint,
        type: wallet ? "PUT" : "POST",
        authorized: true,
        data: { ...data, ownerId: userId },
      }),
    {
      onSuccess: () => {
        if (wallet) {
          queryClient.invalidateQueries(`/wallet/${wallet.id}`);
        }
        queryClient.invalidateQueries(`wallet/owner/${userId}`);
        callback();
      },
    },
  );
}

export function useDeleteWallet(walletId: string, callback: VoidFunction) {
  const auth = useAuth();

  const userId = auth?.data?.user.id;
  const queryClient = useQueryClient();
  const endpoint = `/wallet/${walletId}`;

  return useMutation(
    () =>
      fetcher({
        endpoint,
        type: "DELETE",
        authorized: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`wallet/owner/${userId}`);
        callback();
      },
    },
  );
}

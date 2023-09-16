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

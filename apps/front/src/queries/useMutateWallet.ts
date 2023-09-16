import { useMutation, useQueryClient } from "react-query";
import fetcher from "../utils/fetcher";
import { useAuth } from "../hooks/use-auth";

export function useMutateWallet(callback: VoidFunction) {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const userId = auth?.data?.user.id;

  return useMutation(
    (data: {}) =>
      fetcher({
        endpoint: "/wallet",
        type: "POST",
        authorized: true,
        data: { ...data, ownerId: userId },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`wallet/owner/${userId}`);
        callback();
      },
    },
  );
}

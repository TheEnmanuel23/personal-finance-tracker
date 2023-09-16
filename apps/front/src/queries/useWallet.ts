import { useQuery } from "react-query";
import fetcher from "../utils/fetcher";

export const useWallet = (walletId) => {
  const endpoint = `/wallet/${walletId}`;

  return useQuery(endpoint, () => {
    return fetcher({
      type: "GET",
      endpoint,
      authorized: true,
    });
  });
};

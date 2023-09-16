import { useQuery } from "react-query";
import fetcher from "../utils/fetcher";

export default (categoryId: string, onSuccess: (data: unknown) => void) => {
  return useQuery(
    `transactions/categories/${categoryId}`,
    () => {
      return fetcher({
        type: "GET",
        authorized: true,
        endpoint: `/transaction/categories/${categoryId}`,
      });
    },
    {
      onSuccess,
    },
  );
};

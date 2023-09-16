import { useAuth } from "../../hooks/use-auth";
import { useQuery } from "react-query";
import { Typography } from "ui";
import Link from "./components/Link";
import { PlusIcon } from "@heroicons/react/20/solid";

const Wallets = () => {
  const auth = useAuth();

  const { data, isLoading } = useQuery("wallets", () => {
    return fetch(`http://localhost:8000/wallet/owner/${auth.data?.user.id}`, {
      headers: {
        Authorization: `Bearer ${auth.data?.jwt}`,
      },
    }).then((res) => res.json());
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Typography as="h3">My Wallets</Typography>
        <Link to="/add-wallet" className="text-green-500 hover:underline">
          <PlusIcon className="text-sm h-6 w-6 inline" /> Add new Wallet
        </Link>
      </div>
      <div className="mt-5">
        <ul>
          {data.map((wallet) => (
            <li key={wallet.id} className="mb-5 ">
              <Link
                to={`/wallet/${wallet.id}`}
                className="flex flex-col justify-center p-5 hover:bg-gray-100"
              >
                <Typography as="h4">{wallet.name}</Typography>
                <div className="flex justify-between w-full">
                  <Typography className="text-sm text-gray-600">
                    {wallet.note}
                  </Typography>
                  <Typography className="text-sm text-center flex items-center gap-1">
                    <span className="font-bold">Currency:</span>
                    <strong className="text-xl">{wallet.currency}</strong>
                  </Typography>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallets;

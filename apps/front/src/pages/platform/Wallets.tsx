import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useQuery } from "react-query";

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
      <div>
        <p>My Wallets</p>
        <Link to="/add-wallet">Add new Wallet</Link>
      </div>
      <div className="mt-5">
        <ul>
          {data.map((wallet) => (
            <li key={wallet.id}>
              <Link className="underline" to={`/wallet/${wallet.id}`}>
                {wallet.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallets;

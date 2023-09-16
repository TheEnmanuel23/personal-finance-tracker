import { Typography } from "ui";
import Link from "./Link";
import clsx from "clsx";

const getTotals = (transactions = []) => {
  const totals = transactions.reduce(
    (acc, curr) => {
      let { totalIncomes, totalExpenses } = acc;

      if (curr.type === "EXPENSE") {
        totalExpenses += curr.amount;
      } else {
        totalIncomes += curr.amount;
      }
      return { totalExpenses, totalIncomes };
    },
    { totalExpenses: 0, totalIncomes: 0 },
  );
  return totals;
};

const WalletSummary = ({ wallet }) => {
  const totals = getTotals(wallet.transactions);
  const diff = totals.totalIncomes - totals.totalExpenses;

  return (
    <div className="mb-10 px-3 rounded shadow shadow-gray-200 pt-5 pb-10">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Typography className="text-sm text-gray-700">Inflow</Typography>
          <Typography className="text-blue-800">
            +{wallet.currency}
            {totals.totalIncomes}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="text-sm text-gray-700">Outflow</Typography>
          <Typography className="text-red-800">
            -{wallet.currency}
            {totals.totalExpenses}
          </Typography>
        </div>
        <hr className="" />
        <p
          className={clsx("self-end", {
            "text-red-800": diff < 0,
            "text-blue-800": diff > 0,
          })}
        >
          {wallet.currency}
          {diff}
        </p>
      </div>
      <Link
        className="hover:underline rounded text-green-500 font-semibold uppercase text-sm block text-center mt-10"
        to={`/wallet/${wallet.id}/report`}
      >
        View Report for this period
      </Link>
    </div>
  );
};

export default WalletSummary;

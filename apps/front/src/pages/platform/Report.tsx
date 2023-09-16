import { useParams } from "react-router-dom";
import { useState } from "react";
import PieChart from "./components/PieChart";
import TransactionsPane from "./components/TransactionsPane";
import GoBackLink from "./components/GoBackLink";
import { Typography } from "ui";
import clsx from "clsx";
import { useTransactions } from "../../queries/useTransactions";

const Report = () => {
  const { id: walletId } = useParams();
  const [panel, setPanel] = useState("");

  const { data: transactions, isLoading } = useTransactions(walletId, true);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChartClick = (panel) => {
    setPanel(panel);
  };

  const netIncome = transactions?.totalIncomes - transactions?.totalExpenses;

  return (
    <div className="">
      <div>
        <GoBackLink to={`/wallet/${walletId}`} />
        <div className="mb-10 px-3 rounded shadow shadow-gray-200 pt-5 pb-10 flex flex-col items-center gap-4">
          <Typography as="h3">Net Incomes</Typography>
          <Typography
            className={clsx("text-xl font-bold", {
              "text-green-500": netIncome > 0,
              "text-red-500": netIncome <= 0,
            })}
          >
            {netIncome > 0 ? "+" : "-"} {transactions.wallet.currency}{" "}
            {netIncome}
          </Typography>
        </div>
      </div>
      <div className="flex">
        <PieChart
          transactions={transactions}
          title="Incomes"
          onClick={() => handleChartClick("incomes")}
        />
        <PieChart
          transactions={transactions}
          title="Expenses"
          onClick={() => handleChartClick("expenses")}
        />
      </div>
      {panel && <TransactionsPane panel={panel} transactions={transactions} />}
    </div>
  );
};

export default Report;

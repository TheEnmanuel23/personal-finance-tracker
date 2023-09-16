import { useState } from "react";
import TransactionPanelRow from "./TransactonPanelRow";
import { Bar, BarChart, LabelList, ResponsiveContainer } from "recharts";
import { Typography } from "ui";
import clsx from "clsx";

const TransactionsPane = ({
  panel,
  transactions,
}: {
  panel: "incomes" | "expenses";
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div>
      <div className="my-10 px-3 rounded shadow shadow-gray-200 pt-5 pb-10 flex flex-col gap-2">
        <div className="flex flex-col items-center">
          <Typography as="h4">{panel.toUpperCase()}</Typography>
          <Typography
            className={clsx("font-bold text-red-500", {
              "!text-blue-500": panel === "incomes",
            })}
          >
            {transactions.wallet.currency}
            {
              transactions[
                panel === "incomes" ? "totalIncomes" : "totalExpenses"
              ]
            }
          </Typography>
        </div>
        <ul>
          {transactions[panel].map((transactionCategory, index) => (
            <>
              <TransactionPanelRow
                key={transactionCategory.id}
                currency={transactions.wallet.currency}
                transactionCategory={transactionCategory}
                selectedCategory={selectedCategory}
                onClick={(categoySelected) =>
                  setSelectedCategory(categoySelected)
                }
              />
              <hr />
            </>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div className="mt-10 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={70}
              height={250}
              data={selectedCategory.transactions}
            >
              <Bar
                dataKey="amount"
                fill={panel === "expenses" ? "#F25A5A" : "#00C49F"}
              >
                <LabelList
                  dataKey="amount"
                  position="inside"
                  formatter={(amount) => {
                    return `${transactions.wallet.currency}${amount}`;
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TransactionsPane;

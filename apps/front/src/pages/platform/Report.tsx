import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";

const groupTransactions = (transactions: []) => {
  const groups = {};

  transactions.forEach((transaction) => {
    if (groups[transaction.category.id]) {
      groups[`${transaction.category.id}`].total += transaction.amount;
      groups[`${transaction.category.id}`].transactions = [
        ...groups[transaction.category.id].transactions,
        transaction,
      ];
    } else {
      groups[`${transaction.category.id}`] = {
        ...transaction.category,
        transactions: [transaction],
        total: transaction.amount,
      };
    }
  });

  return groups;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F25A5A"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Report = () => {
  const auth = useAuth();
  const { id: walletId } = useParams();
  const [panel, setPanel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: transactions, isLoading } = useQuery(
    `wallet/${walletId}`,
    () => {
      return fetch(`http://localhost:8000/wallet/${walletId}/transactions`, {
        headers: {
          Authorization: `Bearer ${auth.data?.jwt}`,
        },
      }).then((res) => res.json());
    },
    {
      select: (data) => {
        const expenses = [];
        const incomes = [];

        data.transactions.forEach((transaction) => {
          if (transaction.type === "EXPENSE") {
            expenses.push(transaction);
          } else incomes.push(transaction);
        });

        const grouppedExpenses = groupTransactions(expenses);
        const grouppedIncomes = groupTransactions(incomes);
        const expensesTransactions = Object.values(grouppedExpenses);
        const incomesTransactions = Object.values(grouppedIncomes);

        const totalExpenses = expensesTransactions.reduce(
          (acc, next) => acc + next.total,
          0,
        );
        const totalIncomes = incomesTransactions.reduce(
          (acc, next) => acc + next.total,
          0,
        );

        return {
          expenses: expensesTransactions,
          incomes: incomesTransactions,
          totalExpenses,
          totalIncomes,
          wallet: data,
        };
      },
    },
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const netIncome = transactions?.totalIncomes - transactions?.totalExpenses;
  return (
    <div className="">
      <div>
        <Link to={`/wallet/${walletId}`}>Go back</Link>
        <p>Net Income</p>
        <p className={netIncome > 0 ? "text-green-800" : "text-red-800"}>
          {netIncome > 0 ? "+" : "-"} {transactions.wallet.currency} {netIncome}
        </p>
      </div>
      <div className="flex">
        <div
          className="h-[300px] w-[50%] cursor-pointer hover:bg-gray-100 pt-10"
          onClick={() => {
            setPanel("incomes");
            setSelectedCategory(null);
          }}
        >
          <div className="flex justify-center">
            <p>Income</p>
            <p>
              +{transactions.wallet.currency} {transactions?.totalIncomes}
            </p>
          </div>
          <ResponsiveContainer
            width="100%"
            height="100%"
            style={{ cursor: "pointer" }}
          >
            <PieChart width={400} height={400}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-1 rounded">
                        <p>
                          {transactions.wallet.currency}
                          {payload[0].value}
                        </p>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Pie
                data={transactions?.incomes || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {transactions?.incomes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          className="h-[300px] w-[50%] cursor-pointer hover:bg-gray-100 pt-10"
          onClick={() => {
            setPanel("expenses");
            setSelectedCategory(null);
          }}
        >
          <div className="flex justify-center">
            <p>Expenses</p>
            <p>
              -{transactions.wallet.currency} {transactions?.totalExpenses}
            </p>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-1 rounded">
                        <p>
                          {transactions.wallet.currency}
                          {payload[0].value}
                        </p>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Legend verticalAlign="bottom" height={36} />
              <Pie
                data={transactions?.expenses || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {transactions?.expenses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {panel && (
        <div className="mt-10">
          <h3>{panel.toUpperCase()}</h3>
          <p>
            {transactions.wallet.currency}
            {
              transactions[
                panel === "incomes" ? "totalIncomes" : "totalExpenses"
              ]
            }
          </p>
          <ul>
            {transactions[panel].map((transactionCategory) => (
              <li
                key={transactionCategory.id}
                className={`hover:bg-gray-100 cursor-pointer ${
                  selectedCategory?.id === transactionCategory.id
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
                onClick={() => setSelectedCategory(transactionCategory)}
              >
                <hr />
                {transactionCategory.name} {transactions.wallet.currency}{" "}
                {transactionCategory.total}
              </li>
            ))}
          </ul>
          {selectedCategory && (
            <div className="mt-10 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={70}
                  width={730}
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
      )}
    </div>
  );
};

export default Report;

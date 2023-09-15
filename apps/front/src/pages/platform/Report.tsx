import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAuth } from "../../hooks/use-auth";

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

const data = [
  { name: "Group A", total: 400 },
  { name: "Group B", total: 300 },
  { name: "Group C", total: 300 },
  { name: "Group D", total: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
      <div className="flex justify-between">
        <div className="w-[200px] h-[200px]">
          <div className="flex justify-center">
            <p>Income</p>
            <p>
              +{transactions.wallet.currency} {transactions?.totalIncomes}
            </p>
          </div>
          <PieChart width={400} height={400}>
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
        <div className="w-[200px] h-[200px]">
          <div className="flex justify-center">
            <p>Expenses</p>
            <p>
              -{transactions.wallet.currency} {transactions?.totalExpenses}
            </p>
          </div>
          <PieChart width={400} height={400}>
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Report;

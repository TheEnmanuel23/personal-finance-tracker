import clsx from "clsx";
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Typography } from "ui";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F25A5A"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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

const PieChart = ({
  transactions = {},
  onClick,
  title,
}: {
  title: "Expenses" | "Incomes";
}) => {
  console.log({ title });
  const mode = title.toLowerCase();
  return (
    <div
      className="h-[300px] w-[50%] cursor-pointer hover:bg-gray-100 pt-10"
      onClick={onClick}
    >
      <div
        className={clsx("flex justify-center gap-2", {
          "text-red-500": mode === "expenses",
          "text-green-500": mode === "incomes",
        })}
      >
        <Typography>{title}</Typography>
        <Typography>
          {mode === "expenses" ? "-" : "+"}
          {transactions.wallet.currency}
          {mode === "expenses"
            ? transactions?.totalIncomes
            : transactions.totalExpenses}
        </Typography>
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ cursor: "pointer" }}
      >
        <RPieChart width={400} height={400}>
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
            data={transactions[mode]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total"
          >
            {transactions[mode].map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;

import clsx from "clsx";
import { Typography } from "ui";

const TransactionPanelRow = ({
  currency,
  transactionCategory,
  selectedCategory,
  onClick,
}) => {
  return (
    <li
      key={transactionCategory.id}
      className={clsx(
        "flex justify-between p-2 hover:bg-gray-100 bg-white cursor-pointer",
        {
          "bg-gray-200": selectedCategory?.id === transactionCategory.id,
        },
      )}
      onClick={() => onClick(transactionCategory)}
    >
      <Typography>{transactionCategory.name}</Typography>
      <Typography
        className={clsx("text-red-500", {
          "!text-blue-500": transactionCategory.type === "INCOME",
        })}
      >
        {currency}
        {transactionCategory.total}
      </Typography>
    </li>
  );
};

export default TransactionPanelRow;

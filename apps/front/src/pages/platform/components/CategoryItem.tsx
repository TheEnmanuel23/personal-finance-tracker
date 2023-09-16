import { Typography } from "ui";
import TransactionsList from "./TransactionsList";

const CategoryItem = ({ category, wallet }) => {
  return (
    <li>
      <div className="flex items-center justify-between">
        <div className="">
          <Typography as="h5">{category.name}</Typography>
          <Typography className="text-xs text-gray-500">
            {category.transactions.length} <span>Transactions</span>
          </Typography>
        </div>
        <Typography className="">
          {wallet.currency}
          {category.total}
        </Typography>
      </div>
      <TransactionsList transactions={category.transactions} wallet={wallet} />
    </li>
  );
};

export default CategoryItem;

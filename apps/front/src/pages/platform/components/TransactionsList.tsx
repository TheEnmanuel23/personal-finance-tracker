import TransactionItem from "./TransactionItem";

const TransactionsList = ({ transactions, wallet }) => {
  return (
    <ul className="flex flex-col gap-3 py-3 px-1">
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} wallet={wallet} />
      ))}
    </ul>
  );
};

export default TransactionsList;

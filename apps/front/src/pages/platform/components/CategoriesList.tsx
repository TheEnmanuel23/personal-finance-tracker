import CategoryItem from "./CategoryItem";

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

const CategoriesList = ({ wallet }) => {
  const categories = groupTransactions(wallet.transactions);
  const categoriesId = Object.keys(categories);

  return (
    <>
      <ul className="flex flex-col gap-4">
        {categoriesId.map((categoryId) => (
          <CategoryItem
            key={categoryId}
            category={categories[categoryId]}
            wallet={wallet}
          />
        ))}
      </ul>
    </>
  );
};

export default CategoriesList;

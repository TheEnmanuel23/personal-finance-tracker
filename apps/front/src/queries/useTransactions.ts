import { useQuery } from "react-query";
import fetcher from "../utils/fetcher";

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

export const useTransactions = (
  walletId: string,
  formatData: boolean = false,
) => {
  const endpoint = `/wallet/${walletId}/transactions`;
  return useQuery(
    endpoint,
    () => {
      return fetcher({
        type: "GET",
        authorized: true,
        endpoint,
      });
    },
    {
      select: (data) => {
        return formatData ? transformData(data) : data;
      },
    },
  );
};

export function transformData(data) {
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
}

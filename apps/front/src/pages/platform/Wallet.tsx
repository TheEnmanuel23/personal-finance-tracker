import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useQuery } from "react-query";
import { getFormattedDate } from "../../utils/date";
import { useState } from "react";
import Modal from "../../components/Modal";
import AddTransaction from "./components/AddTransaction";
import UpdateTransaction from "./components/UpdateTransaction";

const getTotals = (transactions = []) => {
  const totals = transactions.reduce(
    (acc, curr) => {
      let { totalIncomes, totalExpenses } = acc;

      if (curr.type === "EXPENSE") {
        totalExpenses += curr.amount;
      } else {
        totalIncomes += curr.amount;
      }
      return { totalExpenses, totalIncomes };
    },
    { totalExpenses: 0, totalIncomes: 0 },
  );
  return totals;
};

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

const Wallet = () => {
  const auth = useAuth();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [updateTransactionModal, setUpdateTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { data: wallet, isLoading } = useQuery(`wallet/${params.id}`, () => {
    return fetch(`http://localhost:8000/wallet/${params.id}/transactions`, {
      headers: {
        Authorization: `Bearer ${auth.data?.jwt}`,
      },
    }).then((res) => res.json());
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  let content;
  if (wallet?.transactions.length === 0) {
    content = (
      <div>
        <p>:-(</p>
        <p>No transactions</p>
      </div>
    );
  } else {
    const totals = getTotals(wallet.transactions);
    const diff = totals.totalIncomes - totals.totalExpenses;
    const groups = groupTransactions(wallet.transactions);

    const groupsKeys = Object.keys(groups);

    content = (
      <div>
        <div className="mb-10">
          <p>
            Inflow:{" "}
            <span className="text-blue-800">+{totals.totalIncomes}</span>
          </p>
          <p>
            Outflow:{" "}
            <span className="text-red-800">-{totals.totalExpenses}</span>
          </p>
          <hr className="" />
          <p className={diff < 0 ? "text-red-800" : "text-blue-800"}>{diff}</p>
        </div>
        <ul className="flex flex-col gap-4">
          {groupsKeys.map((groupId) => {
            const item = groups[groupId];
            return (
              <li>
                <hr />
                <h3 className="text-xl font-bold">
                  {item.name} - {item.total}
                </h3>
                <ul className="flex flex-col gap-3">
                  {item.transactions.map((transaction) => {
                    const date = getFormattedDate(transaction.createdAt);

                    return (
                      <li key={transaction.id}>
                        <div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setUpdateTransactionModal(true);
                            }}
                          >
                            <div>
                              <span className="text-xl font-bold">
                                {date.dayOfTheMonth}{" "}
                              </span>
                              <span className="text-xs">
                                {date.dayOfWeek}
                                {", "}
                              </span>
                              <span className="text-xs">{date.month} </span>
                              <span className="text-xs">{date.year}</span>
                            </div>
                          </div>
                          <p
                            className={
                              transaction.type === "EXPENSE"
                                ? "text-red-800"
                                : "text-blue-800"
                            }
                          >
                            {transaction.type === "EXPENSE" && "-"}
                            {wallet.currency} {transaction.amount}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link to="/wallets"> {"<"} Go to my wallets</Link>
        <h1>Wallet: {wallet.name}</h1>

        <button
          className="btn bg-green-500 hover:bg-green-700 rounded text-white p-2 uppercase text-sm"
          onClick={openModal}
        >
          Add Transaction
        </button>
      </div>
      <div>
        <div>Transactions</div>
        <div>{content}</div>
      </div>
      <Modal title="Add Transaction" closeModal={closeModal} isOpen={isOpen}>
        <div className="mt-2">
          <h1>Wallet: {wallet.name}</h1>
        </div>

        <AddTransaction walletId={wallet.id} onSubmit={closeModal} />
      </Modal>
      <Modal
        title="Update Transaction"
        closeModal={() => setUpdateTransactionModal(false)}
        isOpen={updateTransactionModal}
      >
        <div className="mt-2">
          <h1>Wallet: {wallet.name}</h1>
        </div>

        <UpdateTransaction
          transaction={selectedTransaction}
          onSubmit={() => setUpdateTransactionModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Wallet;

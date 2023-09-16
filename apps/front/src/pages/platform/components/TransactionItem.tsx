import { Typography } from "ui";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { getFormattedDate } from "../../../utils/date";
import clsx from "clsx";
import TransactionForm from "./TransactionForm";

const TransactionItem = ({ transaction, wallet }) => {
  const [updateTransactionModal, setUpdateTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const date = getFormattedDate(transaction.createdAt);

  return (
    <>
      <li
        className="hover:cursor-pointer flex justify-between hover:bg-gray-100 p-2"
        onClick={() => {
          setSelectedTransaction(transaction);
          setUpdateTransactionModal(true);
        }}
      >
        <div className="flex gap-1">
          <Typography className="text-xl">{date.dayOfTheMonth}</Typography>
          <div>
            <div>
              <span className="text-xs">{date.dayOfWeek}, </span>
              <span className="text-xs">{date.month} </span>
              <span className="text-xs">{date.year}</span>
            </div>
            <Typography className="text-xs text-gray-400">
              {transaction.note}
            </Typography>
          </div>
        </div>
        <Typography
          className={clsx({
            "text-red-800": transaction.type === "EXPENSE",
            "text-blue-800": transaction.type === "INCOME",
          })}
        >
          {transaction.type === "EXPENSE" && "-"}
          {wallet.currency}
          {transaction.amount}
        </Typography>
      </li>

      <Modal
        title="Update Transaction"
        closeModal={() => setUpdateTransactionModal(false)}
        isOpen={updateTransactionModal}
      >
        <div className="mt-2">
          <h1>Wallet: {wallet.name}</h1>
        </div>

        <TransactionForm
          walletId={wallet.id}
          transaction={selectedTransaction}
          onSubmit={() => setUpdateTransactionModal(false)}
        />
      </Modal>
    </>
  );
};

export default TransactionItem;

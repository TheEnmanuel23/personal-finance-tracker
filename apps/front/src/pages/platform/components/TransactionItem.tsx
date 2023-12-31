import { Modal, Typography } from "ui";
import { useState } from "react";
import { getFormattedDate } from "../../../utils/date";
import clsx from "clsx";
import TransactionForm from "./TransactionForm";

function DateField({ formattedDate }) {
  return (
    <div>
      <span className="text-xs">{formattedDate.dayOfWeek}, </span>
      <span className="text-xs">{formattedDate.month} </span>
      <span className="text-xs">{formattedDate.year}</span>
    </div>
  );
}

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
            <DateField formattedDate={date} />
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
        <Typography as="h5" className="mb-5">
          Wallet: {wallet.name}
        </Typography>

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

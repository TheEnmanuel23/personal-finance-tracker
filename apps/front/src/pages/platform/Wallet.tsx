import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { Button, Typography } from "ui";
import GoBackLink from "./components/GoBackLink";
import WalletSummary from "./components/WalletSummary";
import { useState } from "react";
import CategoriesList from "./components/CategoriesList";
import TransactionForm from "./components/TransactionForm";
import { useTransactions } from "../../queries/useTransactions";
import NoData from "./components/NoData";

const Wallet = () => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const { data: wallet, isLoading } = useTransactions(params.id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  let content;
  if (wallet?.transactions.length === 0) {
    content = <NoData message="No Transactions" />;
  } else {
    content = (
      <div>
        <WalletSummary wallet={wallet} />
        <CategoriesList wallet={wallet} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex flex-col gap-3">
          <GoBackLink to="/wallets" />
          <div className="flex justify-between">
            <Typography as="h2">Wallet: {wallet.name}</Typography>

            <Button className="uppercase text-sm" onClick={openModal}>
              Add Transaction
            </Button>
          </div>
        </div>
      </div>
      <div>{content}</div>
      <Modal title="Add Transaction" closeModal={closeModal} isOpen={isOpen}>
        <div className="mt-2">
          <h1>Wallet: {wallet.name}</h1>
        </div>

        <TransactionForm walletId={wallet.id} onSubmit={closeModal} />
      </Modal>
    </div>
  );
};

export default Wallet;

import { Button, Field, Typography } from "ui";
import GoBackLink from "../components/GoBackLink";
import { useState } from "react";
import { useMutateWallet } from "../../../queries/useMutateWallet";
import { useNavigate } from "react-router-dom";

const WalletForm = ({ title, wallet }: { title: string; wallet?: unknown }) => {
  const [values, setValues] = useState(() => {
    if (wallet) return wallet;
    return { name: "", note: "", currency: "" };
  });

  const url = wallet ? `/wallet/${wallet.id}` : "/";

  const navigate = useNavigate();
  const { mutate } = useMutateWallet(wallet, () => {
    navigate(url);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <GoBackLink to={url} />
      <div className="flex flex-col items-center gap-8 py-4">
        <Typography as="h2">{title}</Typography>
        <form className="flex flex-col gap-8 w-[300px]" onSubmit={handleSubmit}>
          <Field
            value={values.name}
            label="Name"
            type="text"
            name="name"
            placeholder="my wallet"
            onChange={handleChange}
            error={!values.name && status === "loading" && "Field is required"}
          />
          <Field
            value={values.note}
            label="Note"
            type="text"
            name="note"
            placeholder="addition notes"
            onChange={handleChange}
            error={!values.note && status === "loading" && "Field is required"}
          />
          <Field
            value={values.currency}
            label="Currency"
            type="text"
            name="currency"
            placeholder="$"
            onChange={handleChange}
          />
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default WalletForm;

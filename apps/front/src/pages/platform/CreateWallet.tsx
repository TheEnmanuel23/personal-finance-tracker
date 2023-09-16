import { Button, Field, Typography } from "ui";
import GoBackLink from "./components/GoBackLink";
import { useState } from "react";
import { useMutateWallet } from "../../queries/useMutateWallet";
import { useNavigate } from "react-router-dom";

const CreateWallet = () => {
  const [values, setValues] = useState({ name: "", note: "", currency: "" });
  const navigate = useNavigate();
  const { mutate } = useMutateWallet(() => navigate("/"));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <GoBackLink to="/wallets" />
      <div className="flex flex-col items-center gap-8 py-4">
        <Typography as="h2">Create a new Wallet</Typography>
        <form className="flex flex-col gap-8 w-[300px]" onSubmit={handleSubmit}>
          <Field
            label="Name"
            type="text"
            name="name"
            placeholder="my wallet"
            onChange={handleChange}
            error={!values.name && status === "loading" && "Field is required"}
          />
          <Field
            label="Note"
            type="text"
            name="note"
            placeholder="addition notes"
            onChange={handleChange}
            error={!values.note && status === "loading" && "Field is required"}
          />
          <Field
            label="Currency"
            type="text"
            name="currency"
            placeholder="$"
            onChange={handleChange}
          />
          <Button>Add</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateWallet;

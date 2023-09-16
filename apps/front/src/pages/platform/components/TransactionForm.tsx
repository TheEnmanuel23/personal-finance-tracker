import { useState } from "react";
import useCategories from "../../../queries/useCategories";
import {
  useDeleteTransaction,
  useMutateTransaction,
} from "../../../queries/useMutateTransaction";
import { Button, Field, Select } from "ui";

const transactionTypes = [
  { name: "Expense", value: "EXPENSE" },
  { name: "Income", value: "INCOME" },
];

const TransactionForm = ({
  walletId,
  onSubmit,
  transaction,
}: {
  walletId: string;
  onSubmit: VoidFunction;
  transaction?: {
    id: string;
    categoryId: string;
    amount: number;
    note?: string;
    walletId: string;
    type: "INCOME" | "EXPENSE";
    category: {
      name: string;
      id: string;
    };
  };
}) => {
  const [selectedType, setSelectedType] = useState(() => {
    if (transaction) {
      return transactionTypes.find((item) => item.value === transaction.type);
    } else {
      return transactionTypes[0];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (transaction) {
      return {
        name: transaction.category.name,
        value: transaction.category.id,
      };
    } else {
      return { value: "", name: "" };
    }
  });
  const [values, setValues] = useState(() => {
    if (transaction) {
      return {
        note: transaction.note,
        amount: transaction.amount,
      };
    } else {
      return {
        note: "",
        amount: 0,
      };
    }
  });

  const { data = [] } = useCategories(selectedType.value, (res) => {
    if (!transaction) {
      setSelectedCategory({ name: res[0].name, value: res[0].id });
    }
  });

  const { mutate: mutateTransaction } = useMutateTransaction(
    walletId,
    transaction?.id,
    onSubmit,
  );

  const { mutate: deleteTransaction } = useDeleteTransaction(
    transaction?.id,
    walletId,
    onSubmit,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    mutateTransaction({
      amount: Number(values.amount),
      note: values.note,
      categoryId: selectedCategory.value,
      type: selectedType.value,
      walletId,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "amount" ? e.target.valueAsNumber : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="flex w-[300px] flex-col gap-5">
        <div>
          <label>
            <span className="text-sm text-bold">Type</span>
          </label>
          <Select
            className="z-20"
            selected={selectedType}
            onSelect={setSelectedType}
            options={transactionTypes}
          />
        </div>
        <div>
          <label>
            <span className="text-sm text-bold">Category</span>
          </label>
          <Select
            className="z-10"
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            options={data.map((item) => ({
              name: item.name,
              value: item.id,
            }))}
          />
        </div>
        <Field
          label="Amount"
          placeholder="0"
          type="number"
          name="amount"
          value={values.amount}
          onChange={handleChange}
        />
        <Field
          label="Notes"
          placeholder="Additional notes"
          type="text"
          name="note"
          value={values.note}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-4">
          <Button>Save</Button>
          {transaction && (
            <Button
              variant="secondary"
              type="button"
              onClick={deleteTransaction}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;

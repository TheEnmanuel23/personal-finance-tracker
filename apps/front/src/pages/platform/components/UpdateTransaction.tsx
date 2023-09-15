import { useState } from "react";
import Select from "../../../components/Select";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../../../hooks/use-auth";

const transactionTypes = [
  { name: "Expense", value: "EXPENSE" },
  { name: "Income", value: "INCOME" },
];

const fetcher = async ({
  jwt,
  id,
  data,
  type,
}: {
  jwt: string;
  id: string;
  type: "PUT" | "DELETE" | "POST";
  data: {
    categoryId: string;
    amount: number;
    note?: string;
    type: string;
    walletId: string;
  };
}) => {
  return await fetch(`http://localhost:8000/transaction/${id}`, {
    method: type,
    ...(["PUT", "POST"].includes(type) && { body: JSON.stringify(data) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

const UpdateTransaction = ({
  onSubmit,
  transaction,
}: {
  onSubmit: VoidFunction;
  transaction: {
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
  const auth = useAuth();
  const [selectedType, setSelectedType] = useState(() =>
    transactionTypes.find((item) => item.value === transaction.type),
  );
  const [selectedCategory, setSelectedCategory] = useState({
    name: transaction.category.name,
    value: transaction.category.id,
  });
  const [values, setValues] = useState({
    note: transaction.note,
    amount: transaction.amount,
  });
  const queryClient = useQueryClient();

  const { data = [] } = useQuery(
    `transactions/categories/${selectedType.value}`,
    async () => {
      return await fetch(
        `http://localhost:8000/transaction/categories/${selectedType.value}`,
        {
          headers: {
            Authorization: `Bearer ${auth.data?.jwt}`,
          },
        },
      ).then((res) => res.json());
    },
  );

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(`wallet/${transaction.walletId}`);
      onSubmit();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      type: "PUT",
      jwt: auth.data?.jwt,
      id: transaction.id,
      data: {
        amount: Number(values.amount),
        note: values.note,
        categoryId: selectedCategory.value,
        type: selectedType.value,
        walletId: transaction.walletId,
      },
    });
  };

  const handleDelete = () => {
    mutate({
      type: "DELETE",
      jwt: auth.data?.jwt,
      id: transaction.id,
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "amount" ? e.target.valueAsNumber : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-5  w-[300px]" onSubmit={handleSubmit}>
      <div>
        <label className="">
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
        <label className="">
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
      <label className="relative block">
        <span className="text-sm text-bold">Amount</span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="0"
          type="number"
          name="amount"
          value={values.amount}
          onChange={handleChange}
        />
      </label>

      <label className="relative block">
        <span className="text-sm text-bold">Note</span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Additional notes"
          type="text"
          name="note"
          value={values.note}
          onChange={handleChange}
        />
      </label>

      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        Save
      </button>
    </form>
  );
};

export default UpdateTransaction;

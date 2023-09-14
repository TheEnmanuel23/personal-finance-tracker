import { TransactionType } from "@prisma/client";
import { hashPassword } from "lib/auth";
import { db } from "lib/db";

const expensesCategories = [
  {
    name: "Food & Beverage",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Transportation",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Rentals",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Water Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Phone Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Electricity Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Gas Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "TV Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Internet Bill",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Insurances",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Education",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Fitness",
    type: TransactionType.EXPENSE,
  },
  {
    name: "Makeup",
    type: TransactionType.EXPENSE,
  },
];

const incomeCategories = [
  {
    name: "Collect interest",
    type: TransactionType.INCOME,
  },
  {
    name: "Salary",
    type: TransactionType.INCOME,
  },
  {
    name: "Other Income",
    type: TransactionType.INCOME,
  },
  {
    name: "Incoming Transfer",
    type: TransactionType.INCOME,
  },
];

async function main(): Promise<void> {
  const category = await db.transactionCategory.createMany({
    data: [...expensesCategories, ...incomeCategories],
  });

  // const user = await db.user.create({
  //   data: {
  //     email: "user2@gmai.com",
  //     firstName: "User",
  //     lastName: "person",
  //     password: await hashPassword("password"),
  //   },
  // });
  //
  console.log({ category });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });

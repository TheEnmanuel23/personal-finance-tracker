import { TransactionType } from "@prisma/client";
import { hashPassword } from "lib/auth";
import { db } from "lib/db";

async function main(): Promise<void> {
  const category = await db.category.create({
    data: {
      name: "category dos",
      type: TransactionType.INCOME
    }
  });

  const user = await db.user.create({
    data: {
      email: "user2@gmai.com",
      firstName: "User",
      lastName: "person",
      password: await hashPassword("password")
    }
  });

  console.log({ category, user });
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

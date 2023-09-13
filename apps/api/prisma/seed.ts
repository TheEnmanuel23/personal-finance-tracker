import { TransactionType } from "@prisma/client";
import { db } from "lib/db";

async function main(): Promise<void> {
  const category = await db.category.create({
    data: {
      name: "category dos",
      type: TransactionType.INCOME,
    },
  });

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

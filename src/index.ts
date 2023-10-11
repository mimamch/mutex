interface TransactionMutex {
  createdAt: Date;
  data?: string;
}

const transactionMutex = new Map<string, TransactionMutex>();

const startTransaction = async (
  userId: string,
  transaction: TransactionMutex
): Promise<void> => {
  const userTransaction = transactionMutex.get(userId);
  if (
    userTransaction &&
    userTransaction.createdAt.getTime() < new Date().getTime() + 60000
  ) {
    throw new Error("Please wait until the last transaction finish");
  }
  transactionMutex.set(userId, transaction);
};

const endTransaction = async (userId: string): Promise<void> => {
  transactionMutex.delete(userId);
};

let userBalance = 0;

const transactionExample = async () => {
  const userId = "123";
  try {
    await startTransaction(userId, {
      createdAt: new Date(),
    });

    // Simulate a long running transaction
    await new Promise((resolve) => setTimeout(resolve, 1000));
    userBalance = userBalance + 1000;
  } catch (error) {
    console.log(error);
  } finally {
    await endTransaction(userId);
  }
};

const main = async () => {
  try {
    const results = await Promise.allSettled([
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
      transactionExample(),
    ]);
    console.log(userBalance);
  } catch (error) {
    console.log(error);
  }
};

main();

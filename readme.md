# NodeJS Mutex Example

This is a simple example of how to use mutexes in NodeJS for transaction.

## How it's works?

First you call this function, it will add lock data into transaction mutex's map.

```
startTransaction('user123', {createdAt: new Date()});
```

Then on twice you call the method again, its will be throw an error because the user123 transaction is already running.

When you call

```
endTransaction('user123')
```

It will remove the lock data from transaction mutex's map. And you can call the startTransaction again.

## How about startTransaction function called in same time?

Javascript is running by single thread. So it will be executed one by one.

## How about deadlock?

Before its throw an error, the startTransaction will check when the last transaction is started. And if last transaction started on more than 60 seconds ago, it will not throw an error and the transaction will be started again.

## Usage Example

```javascript
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
```

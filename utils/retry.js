// utils.js
const retry = require('retry');

const retryOperation = (operation, retries = 3, minTimeout = 1000, factor = 2) => {
  return new Promise((resolve, reject) => {
    const operationAttempt = retry.operation({
      retries,
      minTimeout,
      factor,
    });

    operationAttempt.attempt(async (currentAttempt) => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        if (operationAttempt.retry(error)) {
          console.log(`Retrying... Attempt ${currentAttempt}`);
          return;
        }
        reject(operationAttempt.mainError());
      }
    });
  });
};

module.exports = { retryOperation };

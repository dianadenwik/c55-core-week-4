import { transactions } from './data.js';


import chalk from 'chalk';

console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰'));
console.log('');
console.log('Transactions count:', transactions.length);


function addTransaction(transaction) {
  transactions.push({ ...transaction });
}

function getTotalIncome() {
  let totalIncome = 0;

  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }
  }

  return totalIncome;
}

// console.log('Total income:', getTotalIncome());


function getTotalExpenses() {
  let totalExpenses = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      totalExpenses += transactions[i].amount;
    }
  }

  return totalExpenses;
}

function getBalance() {
  const income = getTotalIncome();
  const expenses = getTotalExpenses();

  return income - expenses;
}
// console.log('Balance:', getBalance());

function getTransactionsByCategory(category) {
  const result = [];

  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }

  return result;
}
// console.log('Food transactions:', getTransactionsByCategory('food'));

function getLargestExpense() {
  let largest = null;

  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      if (largest === null || transaction.amount > largest.amount) {
        largest = transaction;
      }
    }
  }

  return largest;
}
// console.log('Largest expense:', getLargestExpense());

function printAllTransactions() {
  console.log(chalk.bold('All Transactions:'));

  for (const transaction of transactions) {
    const { id, type, description, amount, category } = transaction;

    const label = `[${type.toUpperCase()}]`;

    const amountText =
      type === 'income' ? chalk.green(`€${amount}`) : chalk.red(`€${amount}`);

    const categoryText = chalk.yellow(category);

    console.log(`${id}. ${label} ${description} - ${amountText} (${categoryText})`);
  }

  console.log('');
}

printAllTransactions();



function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const count = transactions.length;
  const largestExpense = getLargestExpense();

  console.log(chalk.bold('📊 FINANCIAL SUMMARY 📊'));

  console.log(chalk.bold(`Total income: €${totalIncome}`));
  console.log(chalk.bold(`Total expenses: €${totalExpenses}`));

  const balanceText =
    balance >= 0 ? chalk.cyan(`€${balance}`) : chalk.red(`€${balance}`);
  console.log(chalk.bold(`Current balance: ${balanceText}`));

  console.log(chalk.bold(`Total transactions: ${count}`));

  if (largestExpense) {
    console.log(
      chalk.bold(
        `Largest expense: ${largestExpense.description} (€${largestExpense.amount})`
      )
    );
  } else {
    console.log(chalk.bold('Largest expense: none'));
  }

  console.log('');
}

printSummary();
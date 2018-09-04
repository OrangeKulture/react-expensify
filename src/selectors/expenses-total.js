// const getExpensesTotal = (expenses) => {
//   if(expenses.length === 0) return 0;
//   if(expenses.length === 1) return expenses[0].amount;
//   return expenses.reduce((acc, current) => {
//     return acc + current.amount;
//   },0);
// }

// export default getExpensesTotal;

export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((acc, current) => acc + current, 0);
}
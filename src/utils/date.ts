export const daysLeftInCurrMonth = () => {
  const currDate = new Date();
  const firstDayOfNextMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    0,
  ).getDate();

  return firstDayOfNextMonth - currDate.getDate() + 1;
};

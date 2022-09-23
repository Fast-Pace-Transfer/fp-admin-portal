/**
 * @name formatAmount
 * @description Function to format amounts
 */

export const formatAmount = (amount: number): string => {
  // Format amount
  const formattedAmount: string = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};

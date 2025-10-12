const modifyAmount = (amount) => {
  if(!amount) return 0;
  const amountString = amount?.toString();
  const amountArray = amountString?.split(".");
  const modifiableAmount = amountArray[0];
  const amountAfterPoint = amountArray[1];

  const modifiedAmount =
    modifiableAmount?.length > 3
      ? `${modifiableAmount.slice(-100, -3)},${modifiableAmount.slice(-3)}`
      : Number(amount || 0).toFixed(2);
  return modifiedAmount;
};

export default modifyAmount;

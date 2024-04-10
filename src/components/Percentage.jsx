const Percentage = ({ a, b }) => {
  const value = (a / b) * 100;
  const percentage = `${value.toFixed(2)}%`;
  return percentage;
};

export default Percentage;

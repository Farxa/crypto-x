const dollarFormatter = function (value) {
  if (!value) {
    return "$0.00";
  }
  return `$${parseFloat(value).toFixed(2)}`;
};

const percentFormatter = function (value) {
  if (!value) {
    return "0%";
  }
  return `${Number(value).toFixed(2)}%`;
};

export { dollarFormatter, percentFormatter };

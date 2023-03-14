const CurrencyConvertion = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'BDT',
  }).format(value);
export default CurrencyConvertion;

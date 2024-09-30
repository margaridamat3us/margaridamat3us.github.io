const formatCurrency = (value, currency) => {
  console.log("Formatting value:", value);
  if (isNaN(value)) {
    console.error("Value is not a number:", value);
    return "Invalid price"; // Retornar uma string que indique um preço inválido
  }
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(value);
};
export default formatCurrency;

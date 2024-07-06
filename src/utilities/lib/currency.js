export const showCurrency = (value, currency) => {
  if (!value || value === "null") return "N/A";

  if (currency.position.toString() === "0")
    return currency.name + " " + value ?? "N/A";
  else return value ?? "N/A" + " " + currency.name;
};

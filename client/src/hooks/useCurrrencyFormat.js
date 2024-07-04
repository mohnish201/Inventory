import { useContext } from "react";
import { OrganizationContextProvider } from "../providers/ContextProvider";

const useCurrencyFormat = () => {
  const { organizationData } = useContext(OrganizationContextProvider);

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: organizationData?.baseCurrency || "INR",
    });
    return formatter.format(amount);
  };

  return { formatCurrency };
};

export { useCurrencyFormat };

export function formatCurrency(value, currency = "LKR") {
    if (isNaN(value) || value === null || value === undefined) {
      return `${currency} 0.00`;
    }
  
    return `${currency} ${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
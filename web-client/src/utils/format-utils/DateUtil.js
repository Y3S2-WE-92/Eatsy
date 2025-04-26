export const formatCustomDate = (timestamp) => {
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Extract date components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour
  hours = hours % 12 || 12;

  // Function to add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (num) => {
    if (num > 10 && num < 20) return "th"; // Covers 11th - 19th
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
};

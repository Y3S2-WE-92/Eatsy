export const formatStatusBadge = (status) => {
    const statusMap = {
      pending: { text: "Pending", badgeClass: "warning" },
      accepted: { text: "Accepted", badgeClass: "success" },
      rejected: { text: "Rejected", badgeClass: "error" },
      paid: { text: "Paid", badgeClass: "info" },
      preparing: { text: "Preparing", badgeClass: "info" },
      ready: { text: "Ready", badgeClass: "info" },
      assigned: { text: "Assigned", badgeClass: "info" },
      pickup: { text: "Pickup", badgeClass: "info" },
      delivered: { text: "Delivered", badgeClass: "success" },
    };
  
    return statusMap[status] || { text: status, badgeClass: "ghost" };
  };
  
export const mimicDeliveryTime = () => {
  return Math.floor(Math.random() * (30 - 15 + 1) + 15);
};

export const mimicDeliveryFee = () => {
  return Math.floor(Math.random() * (100 - 80 + 1) + 80);
};

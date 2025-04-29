export const ASSIGN_ORDER = 'ASSIGN_ORDER';

export const assignOrder = (order) => ({
  type: ASSIGN_ORDER,
  payload: order,
});

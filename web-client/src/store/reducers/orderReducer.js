import { ASSIGN_ORDER } from '../actions/orderActions';

const initialState = {
  assignedOrders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_ORDER:
      return {
        ...state,
        assignedOrders: [...state.assignedOrders, action.payload],
      };
    // ...existing cases...
    default:
      return state;
  }
};

export default orderReducer;

import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  statusOrder: false,
  sendOrder: (choose) => {},
  addItem: (item) => {},
  removeItem: (id) => {}
});

export default CartContext;
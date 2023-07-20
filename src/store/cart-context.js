import React from "react";

const CartContext = React.createContext({
	items: [],
	itemsOrders: [],
	totalAmount: 0,
	statusOrder: false,
	addItemsOrders: items => {},
	sendOrder: choose => {},
	addItem: item => {},
	removeItem: id => {},
});

export default CartContext;

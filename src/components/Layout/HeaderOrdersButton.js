import classes from "./HeaderOrdersButton.module.css";

const OrdersCartButton = props => {
	return (
		<button className={classes.btnOrder} onClick={props.onClick}>
			Orders
		</button>
	);
};

export default OrdersCartButton;

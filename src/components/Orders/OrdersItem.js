import classes from "./OrdersItem.module.css";

const OrderItem = props => {
	const changePrice = props.price.toFixed(2);
	return (
		<li className={classes["order-item"]}>
			<div>
				<h2>ORDER</h2>
				<div className={classes.summary}>{props.itemsList}</div>
				<p className={classes.textPrice}> Price: ${changePrice} </p>
			</div>
		</li>
	);
};

export default OrderItem;

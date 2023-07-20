import { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useHttp from "../hooks/use-http";
import LoginContext from "../../store/login-context";

const Cart = props => {
	const cartCtx = useContext(CartContext);
	const { isLoading, error, sendRequest: checkUserIdRequest } = useHttp();
	const lgnCtx = useContext(LoginContext);
	const [userIdOrder, setUserIdOrder] = useState("");
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const orderItems = cartCtx.items;

	const loadedNameOrders = [];
	let loadedPrice = cartCtx.totalAmount;

	orderItems.map(item => {
		loadedNameOrders.push(
			"DinnerName: " + item.name + " Amount: " + item.amount + " | "
		);
	});

	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = item => {
		cartCtx.addItem(item);
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map(item => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const enteredOrderHandler = () => {
		const findId = dataUsers => {
			const loadedUsers = [];

			for (const user in dataUsers) {
				loadedUsers.push({ id: user, name: dataUsers[user].name });
			}

			const userFinded = loadedUsers.find(item => item.name === lgnCtx.name);

			lgnCtx.onNameOrderId(userFinded.id);
		};

		checkUserIdRequest(
			{
				url: "https://react-food-app-cffd3-default-rtdb.firebaseio.com/login.json",
			},
			findId
		);

		checkUserIdRequest({
			url:
				"https://react-food-app-cffd3-default-rtdb.firebaseio.com/login/" +
				lgnCtx.nameOrderId +
				"/orderItems.json",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: { nameList: loadedNameOrders, price: loadedPrice },
		});
	};

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={enteredOrderHandler}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;

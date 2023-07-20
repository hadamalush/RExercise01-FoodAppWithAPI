import classes from "./Orders.module.css";
import useHttp from "../hooks/use-http";
import Modal from "../UI/Modal";
import LoginContext from "../../store/login-context";
import CartContext from "../../store/cart-context";
import { useContext, useEffect } from "react";

const Orders = props => {
	const { isLoading, error, sendRequest: getData } = useHttp();
	const lgnCtx = useContext(LoginContext);
	const cartCtx = useContext(CartContext);

	const getUserID = dataUsers => {
		const loadedUsers = [];

		for (const user in dataUsers) {
			loadedUsers.push({ id: user, name: dataUsers[user].name });
		}

		const userFinded = loadedUsers.find(item => item.name === lgnCtx.name);

		lgnCtx.onNameOrderId(userFinded.id);

		const loadedOrders = [];

		const getOrders = dataOrders => {
			for (const order in dataOrders) {
				loadedOrders.push({
					orderList: dataOrders[order].nameList,
					price: dataOrders[order].price,
				});
			}
			cartCtx.addItemsOrders(loadedOrders);
		};

		getData(
			{
				url:
					"https://react-food-app-cffd3-default-rtdb.firebaseio.com/login/" +
					lgnCtx.nameOrderId +
					"/orderItems.json",
			},
			getOrders
		);
	};

	useEffect(() => {
		getData(
			{
				url: "https://react-food-app-cffd3-default-rtdb.firebaseio.com/login.json",
			},
			getUserID
		);
	}, [lgnCtx.nameOrderId]);

	// const orderItems = <ul className={classes["order-items"]}>

	// </ul>;

	cartCtx.itemsOrders.map(item => {
		let items = "";
		for (let i = 0; i < item.orderList.length; i++) {
			items += item.orderList[i] + "\n";
		}
		console.log(items);
	});

	console.log(cartCtx.itemsOrders);
	return (
		<Modal>
			{/* {cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				
			</div> */}
		</Modal>
	);
};

export default Orders;

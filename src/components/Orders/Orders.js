import classes from "./Orders.module.css";
import useHttp from "../hooks/use-http";
import Modal from "../UI/Modal";
import LoginContext from "../../store/login-context";
import CartContext from "../../store/cart-context";
import OrdersItem from "./OrdersItem";
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
			console.log("Data orders: ", dataOrders);
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

	// </ul>

	const loadedTransformedOrders = [];

	console.log("cartitems:", cartCtx.itemsOrders);

	cartCtx.itemsOrders.map(item => {
		let items = "";
		for (let i = 0; i < item.orderList.length; i++) {
			items += item.orderList[i] + "\n ";
		}
		loadedTransformedOrders.push({ items: items, price: item.price });
	});

	const listOrderItems = (
		<ul className={classes["orders-items"]}>
			<h1>List Orders</h1>
			{console.log("Wywolanie UL")}
			{loadedTransformedOrders.map(item => {
				return (
					<OrdersItem
						key={Math.random()}
						itemsList={item.items}
						price={item.price}
					/>
				);
			})}
		</ul>
	);
	console.log(loadedTransformedOrders);

	return <Modal onClose={props.onClose}>{listOrderItems}</Modal>;
};

export default Orders;

import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import LoginProvider from "./store/LoginProvider";
import Orders from "./components/Orders/Orders";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);
	const [orderIsShown, setOrderIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};
	const showOrderHandler = () => {
		setOrderIsShown(true);
	};

	const hideOrderHandler = () => {
		setOrderIsShown(false);
	};

	return (
		<CartProvider>
			<LoginProvider>
				{cartIsShown && <Cart onClose={hideCartHandler} />}
				{orderIsShown && <Orders onClose={hideOrderHandler} />}
				<Header onShowCart={showCartHandler} onShowOrders={showOrderHandler} />
				<main>
					<Meals />
				</main>
			</LoginProvider>
		</CartProvider>
	);
}

export default App;

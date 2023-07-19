import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import LoginProvider from "./store/LoginProvider";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			<LoginProvider>
				{cartIsShown && <Cart onClose={hideCartHandler} />}
				<Header onShowCart={showCartHandler} />
				<main>
					<Meals />
				</main>
			</LoginProvider>
		</CartProvider>
	);
}

export default App;

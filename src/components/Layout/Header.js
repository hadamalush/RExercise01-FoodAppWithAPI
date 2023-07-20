import { Fragment, useState } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import Login from "../LoginF/Login";
import HeaderOrdersCartButton from "./HeaderOrdersButton";

const Header = props => {
	const [cartStatus, setCartStatus] = useState(false);
	const showCartButton = status => {
		setCartStatus(status);
	};
	const showButtons = (
		<div className={classes.buttonContainer}>
			<HeaderOrdersCartButton onClick={props.onShowOrders} />
			<HeaderCartButton onClick={props.onShowCart} />
		</div>
	);

	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<Login onLoginStatus={showCartButton} />
				{cartStatus && showButtons}
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt='A table full of delicious food!' />
			</div>
		</Fragment>
	);
};

export default Header;

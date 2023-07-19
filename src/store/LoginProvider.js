import { useState, useCallback } from "react";
import LoginContext from "./login-context";

const LoginProvider = props => {
	const [onLogin, setOnLogin] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [userName, setUserName] = useState("");

	const orderHandler = useCallback(orderName => {
		setOrderId(orderName);
	});

	const loginHandler = name => {
		setUserName(name);
		setOnLogin(true);
	};

	const logoutHandler = () => {
		setOnLogin(false);
	};

	return (
		<LoginContext.Provider
			value={{
				statusLogin: onLogin,
				name: userName,
				nameOrderId: orderId,
				onNameOrderId: orderHandler,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}>
			{props.children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;

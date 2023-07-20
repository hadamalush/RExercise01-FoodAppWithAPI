import Input from "../UI/Input";
import classes from "./LoginForm.module.css";
import { useContext, useState } from "react";
import LoginContext from "../../store/login-context";

const LoginForm = props => {
	const [enteredNameLogin, setNameLogin] = useState("");
	const [enteredPasswordLogin, setPasswordLogin] = useState("");
	const lgnCtx = useContext(LoginContext);

	const changeNameHandler = event => {
		setNameLogin(event.target.value);
	};
	const changePasswordHandler = event => {
		setPasswordLogin(event.target.value);
	};

	const enterLoginHandler = event => {
		event.preventDefault();
		const isCreate = event.target.id === "newAccount";
		setNameLogin("");
		setPasswordLogin("");

		props.onLogin(enteredNameLogin, enteredPasswordLogin, isCreate);
	};

	const renderBtnLogin = (
		<span>
			<button
				id='login'
				className={classes.btnLogin}
				onClick={enterLoginHandler}>
				Login
			</button>
			<button
				id='newAccount'
				className={classes.btnLogin}
				onClick={enterLoginHandler}>
				Create Account
			</button>
		</span>
	);

	return (
		<form>
			<Input
				label='Name'
				input={{
					id: "name",
					value: enteredNameLogin,
					type: "text",
					onChange: changeNameHandler,
				}}
				className={classes.inputLogin}
			/>
			<Input
				label='Password'
				input={{
					id: "password",
					value: enteredPasswordLogin,
					type: "password",
					onChange: changePasswordHandler,
				}}
				className={classes.inputLogin}
			/>
			{props.onLoading ? <p>Loading... </p> : renderBtnLogin}
		</form>
	);
};

export default LoginForm;

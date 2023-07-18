import Input from "../UI/Input";
import classes from "./LoginForm.module.css";
import { useRef } from "react";

const LoginForm = props => {
	const nameInputRef = useRef();
	const passwordInputRef = useRef();

	const enterLoginHandler = event => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const isCreate = event.target.id === "newAccount";

		props.onLogin(enteredName, enteredPassword, isCreate);
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
				ref={nameInputRef}
				label='Name'
				input={{
					id: "name",
					type: "text",
				}}
				className={classes.inputLogin}
			/>
			<Input
				ref={passwordInputRef}
				label='Password'
				input={{
					id: "password",
					type: "password",
				}}
				className={classes.inputLogin}
			/>

			{props.onLoading ? <p>Loading... </p> : renderBtnLogin}
		</form>
	);
};

export default LoginForm;

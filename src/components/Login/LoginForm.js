import Input from "../UI/Input";
import classes from "./LoginForm.module.css";
import { useRef } from "react";

const LoginForm = () => {
	const nameInputRef = useRef();
	const passwordInputRef = useRef();
	const enterLoginHandler = event => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
	};
	return (
		<form onSubmit={enterLoginHandler}>
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
			<button className={classes.btnLogin}>Login</button>
		</form>
	);
};

export default LoginForm;

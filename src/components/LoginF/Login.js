import LoginForm from "./LoginForm";
import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";

import classes from "./Login.module.css";

const Login = props => {
	const { isLoading, error, sendRequest: loginRequest } = useHttp();
	const [loginStatus, setLoginStatus] = useState(false);
	const [userData, setUserData] = useState({});

	const dataLogin = (name, password, isCreate) => {
		const checkDataUsers = dataUsers => {
			const loadedUsers = [];

			for (const user in dataUsers) {
				loadedUsers.push({
					name: dataUsers[user].name,
					password: dataUsers[user].password,
				});
			}

			const listUsers = loadedUsers.find(
				user => user.name === name && user.password === password
			);

			setLoginStatus(typeof listUsers === "object");
			setUserData(listUsers);

			console.log("loginStatus ", loginStatus);
			props.onLoginStatus(loginStatus);
		};

		if (isCreate) {
			loginRequest({
				url: "https://react-food-app-cffd3-default-rtdb.firebaseio.com/login.json",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: { name: name, password: password },
			});
		} else if (!isCreate) {
			loginRequest(
				{
					url: "https://react-food-app-cffd3-default-rtdb.firebaseio.com/login.json",
				},
				checkDataUsers
			);
		}
	};

	useEffect(() => {
		console.log("loginStatus ", loginStatus);
		props.onLoginStatus(loginStatus);
	}, [loginStatus]);

	const allForms = (
		<LoginForm onLogin={dataLogin} onLoading={isLoading} error={error} />
	);

	return (
		<React.Fragment>
			{loginStatus ? (
				<p>
					Logged as <span className={classes.activeUser}>{userData.name}</span>
				</p>
			) : (
				allForms
			)}
		</React.Fragment>
	);
};

export default Login;

import React from "react";

const LoginContext = React.createContext({
	statusLogin: false,
	name: "",
	nameOrderId: '',
	onNameOrderId: () => {},
	onLogin: name => {},
	onLogout: () => {},
});

export default LoginContext;

import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
	const classesInput = `${classes.input} ${props.className}`;
	return (
		<div className={classesInput}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;

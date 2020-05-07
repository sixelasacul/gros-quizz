import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = (props) => (
	<button className={styles.button} {...props}>
		{props.children}
	</button>
);

Button.propTypes = {
	children: PropTypes.object
};

export default Button;

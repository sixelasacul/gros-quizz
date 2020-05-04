import React from "react";
import PropTypes from "prop-types";
import styles from "./ThemeTile.module.css";

const ThemeTile = ({ theme }) => (
	<div className={styles.tile}>
		<h3>{theme.name}</h3>
	</div>
);

ThemeTile.propTypes = {
	theme: PropTypes.shape({
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired
	}).isRequired
};

export default ThemeTile;

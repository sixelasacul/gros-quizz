import React from "react";
import PropTypes from "prop-types";
import ThemeTile from "../ThemeTile/ThemeTile";
import styles from "./ThemesList.module.css";

const ThemesList = ({ themes }) => {
	return (
		<div className={styles.container}>
			{themes.map((theme, index) => (
				<ThemeTile key={index} theme={theme} />
			))}
		</div>
	);
};

ThemesList.propTypes = {
	themes: PropTypes.arrayOf({
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired
	}).isRequired
};

export default ThemesList;

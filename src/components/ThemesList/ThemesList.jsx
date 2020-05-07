import React from "react";
import PropTypes from "prop-types";
import ThemeTile from "../ThemeTile/ThemeTile";
import styles from "./ThemesList.module.css";

const ThemesList = ({ themes, images }) => (
	<div className={styles.container}>
		{themes.map((theme, index) => {
			const image = images.find(
				(image) => image.fixed.originalName === theme.image
			);
			const questions = [
				theme.question1,
				theme.question2,
				theme.question3
			];
			return (
				<ThemeTile
					key={index}
					theme={theme.name}
					timePerQuestion={theme.timePerQuestion}
					questions={questions}
					image={image?.fixed}
				/>
			);
		})}
	</div>
);

ThemesList.propTypes = {
	themes: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			timePerQuestion: PropTypes.number.isRequired,
			question1: PropTypes.string.isRequired,
			question2: PropTypes.string.isRequired,
			question3: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			fixed: PropTypes.shape({
				originalName: PropTypes.string.isRequired
			}).isRequired
		}).isRequired
	).isRequired
};

export default ThemesList;

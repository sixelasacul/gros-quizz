import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import cx from "classnames";
import styles from "./ThemeTile.module.css";
import ThemeModal from "../ThemeModal/ThemeModal";

const ThemeTile = ({ theme, image, questions, answers, timePerQuestion }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [shouldShowModal, setShouldShowModal] = useState(false);

	const onClick = useCallback(() => {
		if (!isDisabled) {
			setIsDisabled(true);
			setShouldShowModal(true);
		}
	}, [isDisabled]);

	console.log(image);

	return (
		<>
			<div
				className={cx(styles.tile, { [styles.disabled]: isDisabled })}
				onClick={onClick}
			>
				{image && <Img fixed={image} />}
				<h3 className={styles.text}></h3>
			</div>
			<ThemeModal
				theme={theme}
				timePerQuestion={timePerQuestion}
				questions={questions}
				answers={answers}
				shouldShowModal={shouldShowModal}
				closeModal={() => setShouldShowModal(false)}
			/>
		</>
	);
};

ThemeTile.propTypes = {
	theme: PropTypes.string.isRequired,
	image: PropTypes.object,
	questions: PropTypes.array.isRequired,
	answers: PropTypes.array.isRequired,
	timePerQuestion: PropTypes.number.isRequired
};

export default ThemeTile;

import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Questions.module.css";
import Button from "../Button/Button";

const Questions = ({ questions, onDifficultySet }) => {
	const [questionLimit, setQuestionLimit] = useState(0);
	const [questionIndex, setQuestionIndex] = useState(-1);

	const isGameReady = useMemo(() => questionLimit > 0, [questionLimit]);
	const isGameFinished = useMemo(() => questionIndex === questionLimit, [
		questionIndex,
		questionLimit
	]);
	const shouldDisplayQuestion = useMemo(
		() =>
			isGameReady && questionIndex < questionLimit && questionIndex >= 0,
		[questionIndex, questionLimit, isGameReady]
	);
	const nextQuestionText = useMemo(() => {
		if (isGameReady) {
			if (questionIndex < questionLimit - 1) {
				return "Prochaine question";
			}
			return "Terminer le thème";
		}
		return "";
	}, [isGameReady, questionIndex, questionLimit]);

	useEffect(() => onDifficultySet(questionLimit), [
		onDifficultySet,
		questionLimit
	]);

	return (
		<>
			<div className={styles.flexContainer}>
				{shouldDisplayQuestion && <h2>{questions[questionIndex]}</h2>}
			</div>
			<div className={styles.flexContainer}>
				{!isGameReady && (
					<div>
						<Button onClick={() => setQuestionLimit(1)}>
							Voie du pleutre
						</Button>
						<Button onClick={() => setQuestionLimit(3)}>
							Voie du GRAND MALADE
						</Button>
					</div>
				)}
				{isGameReady && !isGameFinished && (
					<Button onClick={() => setQuestionIndex(questionIndex + 1)}>
						{nextQuestionText}
					</Button>
				)}
			</div>
		</>
	);
};

Questions.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	onDifficultySet: PropTypes.func,
	onThemeEnd: PropTypes.func
};

export default Questions;

import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Questions.module.css";
import Button from "../Button/Button";

const Questions = ({ questions, answers, onDifficultySet, closeModal }) => {
	const [questionLimit, setQuestionLimit] = useState(0);
	const [questionIndex, setQuestionIndex] = useState(-1);
	const [showAnswers, setShowAnswers] = useState(false);

	const isGameReady = useMemo(() => questionLimit > 0, [questionLimit]);
	const isGameFinished = useMemo(() => questionIndex > questionLimit , [
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
				return "Afficher la question";
			}
			return "Terminer le thème";
		}
		return "";
	}, [isGameReady, questionIndex, questionLimit]);

	function setIndexOrLeaveModal() {
		if (questionIndex >= questionLimit - 1) {
			closeModal();
		} else setQuestionIndex(questionIndex + 1);
	}

	useEffect(() => onDifficultySet(questionLimit), [
		onDifficultySet,
		questionLimit
	]);

	function showAnswerAndDisableQuestion () {
		setShowAnswers(true);
		setQuestionIndex(questionIndex+1)
	}

	return (
		<>
			<div className={styles.flexContainer}>
				{shouldDisplayQuestion && <h2>{questions[questionIndex]}</h2>}
				<div className={styles.flexColumnContainer}>
					{showAnswers && answers.slice(0,questionLimit).map((answer,index) => (
						<h2>{answer}</h2>
					))}
				</div>
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
					<Button onClick={() => setIndexOrLeaveModal()}>
						{nextQuestionText}
					</Button>
				)}
				{questionIndex >= questionLimit -1 && isGameReady && !showAnswers && (
					<Button onClick={() => showAnswerAndDisableQuestion()}>
						Montrer les réponses
					</Button>
				)}
			</div>
		</>
	);
};

Questions.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	onDifficultySet: PropTypes.func,
	onThemeEnd: PropTypes.func,
	closeModal: PropTypes.func.isRequired
};

export default Questions;

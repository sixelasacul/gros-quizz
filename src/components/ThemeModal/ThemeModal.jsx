import React, {
	useState,
	useMemo,
	useCallback,
	useEffect,
	useRef
} from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

Modal.setAppElement("#___gatsby");

const shortTimeThreshold = 10; // seconds

const veryShortTimeThreshold = 5; // seconds

const ThemeModal = ({
	theme,
	timePerQuestion,
	questions,
	shouldShowModal,
	closeModal
}) => {
	console.log(questions)
	const [spentTime, setSpentTime] = useState(0);
	const [isPaused, setIsPaused] = useState(true);
	const [questionLimit, setQuestionLimit] = useState(0);
	const [questionIndex,setQuestionIndex] = useState(0);
	const timerRef = useRef(null);
	const percentage = useMemo(() => (spentTime * 100) / timePerQuestion, [
		spentTime,
		timePerQuestion
	]);
	const timeRemaining = useMemo(() => timePerQuestion - spentTime, [
		spentTime,
		timePerQuestion
	]);
	const isShortTime = useMemo(() => 30 - spentTime <= shortTimeThreshold, [
		spentTime
	]);
	const isVeryShortTime = 30 - spentTime <= veryShortTimeThreshold;

	const timerColor = isVeryShortTime ? "#F44336" : (isShortTime ? "#EBE134" : "#6EEB34");

	const updateTime = useCallback(
		(updatedTime) => !isPaused && setSpentTime(updatedTime),
		[isPaused]
	);
	const resetTimer = useCallback(() => {
		clearTimeout(timerRef.current);
		setSpentTime(0);
		setIsPaused(true);
	}, []);

	const onCloseModal = useCallback(() => {
		resetTimer();
		closeModal();
	}, [closeModal, resetTimer]);

	function setCowardWay() {
		setQuestionLimit(1);
	}

	function setSickWay() {
		setQuestionLimit(3);
	}

	useEffect(() => {
		if (!isPaused) {
			timerRef.current = setTimeout(
				() => updateTime(spentTime + 1),
				1000
			);
		}
		return () => timerRef?.current && clearTimeout(timerRef.current);
	}, [spentTime, isPaused, updateTime]);

	return (
		<Modal
			isOpen={shouldShowModal}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
		>
			<h1>{theme}</h1>
			{(questionIndex >= 1) && (questionIndex <= questionLimit) && <p> {questions[questionIndex-1]} </p>}
			<button onClick={onCloseModal}>close</button>
			<button onClick={() => setIsPaused(false)}>start/resume</button>
			<button onClick={() => setIsPaused(true)}>pause</button>
			<button onClick={resetTimer}>reset</button>
			{questionLimit == 0 && <button onClick={setCowardWay}>Voie du pleutre</button>}
			{questionLimit == 0 && <button onClick={setSickWay}>Voie du GRAND MALADE</button>}
			{questionLimit != 0 && questionIndex < questionLimit && <button onClick={() => setQuestionIndex(questionIndex+1)}>Afficher la question</button>}
			<CircularProgressbar
				value={percentage}
				text={timeRemaining}
				styles={buildStyles({
					textColor: timerColor,
					pathColor: timerColor
				})}
			/>
		</Modal>
	);
};

ThemeModal.propTypes = {
	shouldShowModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	theme: PropTypes.string.isRequired,
	timePerQuestion: PropTypes.number.isRequired
};

export default ThemeModal;

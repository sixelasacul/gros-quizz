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

const ThemeModal = ({
	theme,
	timePerQuestion,
	shouldShowModal,
	closeModal
}) => {
	const [spentTime, setSpentTime] = useState(0);
	const [isPaused, setIsPaused] = useState(true);
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
	const timerColor = useMemo(() => (isShortTime ? "#F44336" : "#03A9F4"), [
		isShortTime
	]);

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
			<p>{theme}</p>
			<button onClick={onCloseModal}>close</button>
			<button onClick={() => setIsPaused(false)}>start/resume</button>
			<button onClick={() => setIsPaused(true)}>pause</button>
			<button onClick={resetTimer}>reset</button>
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

import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Timer from "../Timer/Timer";
import Questions from "../Questions/Questions";
import styles from "./ThemeModal.module.css";

Modal.setAppElement("#___gatsby");

const ThemeModal = ({
	theme,
	timePerQuestion,
	questions,
	shouldShowModal,
	closeModal
}) => {
	const [difficulty, setDifficulty] = useState(0);
	const updateDifficulty = useCallback(
		(difficulty) => setDifficulty(difficulty),
		[]
	);
	const allowedTime = useMemo(() => difficulty * timePerQuestion, [
		difficulty,
		timePerQuestion
	]);

	return (
		<Modal
			isOpen={shouldShowModal}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={closeModal}
			bodyOpenClassName={styles.enclosingBodyModal}
			overlayClassName={{
				base: styles.modalOverlay,
				afterOpen: styles.modalOverlayOpened,
				beforeClose: styles.modalOverlayClosed
			}}
			className={{
				base: styles.modalContent,
				afterOpen: styles.modalContentOpened,
				beforeClose: styles.modalContentClosed
			}}
		>
			<div className={styles.head}>
				<div className={styles.title}>
					<h1>{theme}</h1>
				</div>
				<div className={styles.close}>
					<button onClick={closeModal}>X</button>
				</div>
			</div>
			<div className={styles.body}>
				<hr className={styles.separator} />
				<Questions
					questions={questions}
					onDifficultySet={updateDifficulty}
					onThemeEnd={() => {
						console.log("end of theme");
					}}
				/>
				<hr className={styles.separator} />
				<Timer
					allowedTime={allowedTime}
					onTimerEnd={() => console.log("end of timer")}
				/>
			</div>
		</Modal>
	);
};

ThemeModal.propTypes = {
	shouldShowModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	theme: PropTypes.string.isRequired,
	timePerQuestion: PropTypes.number.isRequired,
	questions: PropTypes.array.isRequired
};

export default ThemeModal;

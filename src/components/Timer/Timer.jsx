import React, {
	useState,
	useMemo,
	useCallback,
	useRef,
	useEffect
} from "react";
import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import Button from "../Button/Button";

const timeThresholds = [
	{
		until: 11,
		color: "#4CAF50"
	},
	{
		until: 6,
		color: "#FF9800"
	},
	{
		until: 0,
		color: "#F44336"
	}
];

const Timer = ({ allowedTime }) => {
	const [spentTime, setSpentTime] = useState(0);
	const [isPaused, setIsPaused] = useState(true);
	const timerRef = useRef(null);

	const percentage = useMemo(() => (spentTime * 100) / allowedTime, [
		spentTime,
		allowedTime
	]);
	const timeRemaining = useMemo(() => allowedTime - spentTime, [
		spentTime,
		allowedTime
	]);
	const timerColor = useMemo(() => {
		let distance = timeRemaining;
		let color = "";
		timeThresholds.forEach((threshold) => {
			const localDistance = timeRemaining - threshold.until;
			if (localDistance >= 0 && localDistance <= distance) {
				distance = localDistance;
				color = threshold.color;
			}
		});
		return color;
	}, [timeRemaining]);

	const updateTime = useCallback(
		(updatedTime) => !isPaused && setSpentTime(updatedTime),
		[isPaused]
	);
	const resetTimer = useCallback(() => {
		clearTimeout(timerRef.current);
		setSpentTime(0);
		setIsPaused(true);
	}, []);

	useEffect(() => {
		if (!isPaused && spentTime < allowedTime) {
			timerRef.current = setTimeout(
				() => updateTime(spentTime + 1),
				1000
			);
		}
		return () => timerRef?.current && clearTimeout(timerRef.current);
	}, [spentTime, isPaused, updateTime, allowedTime]);

	return (
		<div className={styles.gridContainer}>
			<div className={styles.timer}>
				<CircularProgressbar
					value={percentage}
					text={timeRemaining.toString()}
					styles={buildStyles({
						textColor: timerColor,
						pathColor: timerColor
					})}
				/>
			</div>
			<div className={styles.buttons}>
				<Button onClick={() => setIsPaused(false)}>Démarrer</Button>
				<Button onClick={() => setIsPaused(true)}>Arrêter</Button>
				<Button onClick={resetTimer}>Réinitialiser</Button>
			</div>
		</div>
	);
};

Timer.propTypes = {
	allowedTime: PropTypes.number.isRequired,
	onTimerEnd: PropTypes.func
};

export default Timer;

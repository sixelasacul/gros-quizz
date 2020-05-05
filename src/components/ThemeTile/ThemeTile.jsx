import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import cx from "classnames";
import Modal from "react-modal";
import styles from "./ThemeTile.module.css";

Modal.setAppElement("#___gatsby");

const ThemeTile = ({ theme, image }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [shouldShowModal, setShouldShowModal] = useState(false);

	const onClick = useCallback(() => {
		setIsDisabled(true);
		setShouldShowModal(true);
	}, []);

	return (
		<>
			<div
				className={cx(styles.tile, { [styles.disabled]: isDisabled })}
				onClick={onClick}
			>
				{image && <Img fixed={image} />}
				<h3 className={styles.text}>{theme}</h3>
			</div>
			<Modal
				isOpen={shouldShowModal}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
			>
				<p>{theme}</p>
				<button onClick={() => setShouldShowModal(false)}>close</button>
			</Modal>
		</>
	);
};

ThemeTile.propTypes = {
	theme: PropTypes.string.isRequired,
	image: PropTypes.object
};

export default ThemeTile;

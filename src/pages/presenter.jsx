import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ThemesList from "../components/ThemesList/ThemesList";

const Presenter = ({ data }) => {
	return (
		<>
			<h1>Presenter view</h1>
			<ThemesList themes={data.allThemes.nodes} />
		</>
	);
};

Presenter.propTypes = {
	data: PropTypes.shape({
		allThemes: PropTypes.shape({
			nodes: PropTypes.arrayOf({
				name: PropTypes.string.isRequired,
				image: PropTypes.string.isRequired
			}).isRequired
		}).isRequired
	}).isRequired
};

export const query = graphql`
	query {
		allThemes {
			nodes {
				name
				image
			}
		}
	}
`;

export default Presenter;

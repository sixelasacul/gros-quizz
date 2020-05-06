import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ThemesList from "../components/ThemesList/ThemesList";

const Presenter = ({ data }) => (
	<ThemesList
		themes={data.allThemes.nodes}
		images={data.allImageSharp.nodes}
	/>
);

Presenter.propTypes = {
	data: PropTypes.shape({
		allThemes: PropTypes.shape({
			nodes: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					image: PropTypes.string.isRequired,
					timePerQuestion: PropTypes.number.isRequired
				}).isRequired
			).isRequired
		}).isRequired,
		allImageSharp: PropTypes.shape({
			nodes: PropTypes.arrayOf(
				PropTypes.shape({
					fixed: PropTypes.shape({
						originalName: PropTypes.string.isRequired
					}).isRequired
				}).isRequired
			).isRequired
		}).isRequired
	}).isRequired
};

export const query = graphql`
	query {
		allThemes {
			nodes {
				name
				image
				timePerQuestion
			}
		}
		allImageSharp {
			nodes {
				fixed(height: 112) {
					originalName
					src
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`;

export default Presenter;

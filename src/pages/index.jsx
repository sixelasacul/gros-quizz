import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ThemesList from "../components/ThemesList/ThemesList";
import "./index.css";

const Index = ({ data }) => {
	const listener = useCallback((e) => {
		const message = `Hop hop hop, pas si vite p'tit batard.
			Si tu rafraîchis, tu perdras la sélection des catégories,
			et je te maudirais sur 7 générations.
			Es-tu sûr de vouloir rafraîchir la page salo ?`;
		(e || window.event).returnValue = message;
		return message;
	}, []);

	useEffect(() => {
		window.addEventListener("beforeunload", listener);

		return () => window.removeEventListener("beforeunload", listener);
	});
	return (
		<ThemesList
			themes={data.allThemes.nodes}
			images={data.allImageSharp.nodes}
		/>
	);
};

Index.propTypes = {
	data: PropTypes.shape({
		allThemes: PropTypes.shape({
			nodes: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					image: PropTypes.string.isRequired,
					timePerQuestion: PropTypes.number.isRequired,
					question1: PropTypes.string.isRequired,
					question2: PropTypes.string.isRequired,
					question3: PropTypes.string.isRequired,
					answer1: PropTypes.string.isRequired,
					answer2: PropTypes.string.isRequired,
					answer3: PropTypes.string.isRequired
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
				question1
				question2
				question3
				answer1
				answer2
				answer3
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

export default Index;

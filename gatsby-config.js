module.exports = {
	siteMetadata: {
		title: "Le Gros Quizz",
		description: "Le site préféré des joueurs du Gros Quizz",
		author: "sixelasacul"
	},
	plugins: [
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "data",
				path: `${__dirname}/src/data/`
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: `${__dirname}/src/images/`
			}
		},
		{
			resolve: "gatsby-transformer-json",
			options: {
				typeName: ({ node }) => node.name
			}
		}
	]
};

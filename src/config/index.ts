/**
 * Add config variables here
 */
interface Config {
	jira: {
		host: string;
		email: string;
	};
	openai: {
		project: string;
	};
}

type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
	jira: {
		host: "https://benisthegoat.atlassian.net/",
		email: "bcutler94@gmail.com",
	},
	openai: {
		project: "proj_Peg532Z3f8yZdSWMd3g8pBOC",
	},
};

export default config;

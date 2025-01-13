/**
 * Add config variables here
 */
interface Config {
	jira: {
		host: string;
		email: string;
	};
}

type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
	jira: {
		host: "https://benisthegoat.atlassian.net/",
		email: "bcutler94@gmail.com",
	},
};

export default config;

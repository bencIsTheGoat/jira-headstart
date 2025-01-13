import env from "@env";
import config from "@config";
import { Version3Client } from "jira.js";

export default new Version3Client({
	host: config.jira.host,
	authentication: {
		basic: {
			email: config.jira.email,
			apiToken: env.JIRA_TOKEN,
		},
	},
});

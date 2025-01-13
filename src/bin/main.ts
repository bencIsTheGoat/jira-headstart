import jira from "@clients/jira";
import utils from "@utils";
import downloadGithubRepo from "src/jobs/download-github-repo";
import generateImplementationSteps from "src/jobs/generate-implementation-steps";
import { z } from "zod";

/**
 * 1. Get JIRA Issue from JIRA
 * 2. Pull title, description and repo fields
 * 3. Fetch repo from Github
 * 4. Send engineered prompt to chat GPT
 * 5. Write result to JIRA Issue
 */
async function main() {
	const JIRA_ISSUE_ID = "SCRUM-2";

	const issue = await jira.issues.getIssue({
		issueIdOrKey: JIRA_ISSUE_ID,
		fields: ["summary", "description", "customfield_10038"],
	});

	const repoURL = z.string().parse(issue.fields["customfield_10038"]);

	const repoInfo = utils.getRepoInfo(repoURL);

	switch (repoInfo.gitProvider) {
		case "GITHUB": {
			const td = await utils.createTempDir(`${Math.random()}`);
			await downloadGithubRepo({
				owner: repoInfo.owner,
				repoName: repoInfo.name,
				path: "",
				destination: td,
			});
			console.log(`Downloaded all repository files to tempDir: ${td}`);
			const fileIds = await utils.readDirFiles(td);
			const steps = await generateImplementationSteps({
				summary: issue.fields.summary,
				description: z
					.string()
					.parse(issue.fields.description?.content?.[0].content?.[0]?.text),
				fileIds,
			});
			await jira.issueAttachments.addAttachment({
				issueIdOrKey: JIRA_ISSUE_ID,
				attachment: {
					filename: "headstart.md",
					file: z.string().parse(steps),
				},
			});
			console.log("Successfully added headstart instructions to JIRA ticket");
			return;
		}
		default:
			throw new Error("UNSUPPORTED_GIT_PROVIDER");
	}
}

main();

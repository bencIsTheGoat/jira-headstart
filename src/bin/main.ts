import github from "@clients/github";
import jira from "@clients/jira";

async function main() {
	// const chatCompletion = await openai.chat.completions.create({
	// 	messages: [{ role: "user", content: "Say this is a test" }],
	// 	model: "gpt-4o",
	// });

	// const repos = await github.repos.listForUser({
	// 	username: "bencIsTheGoat",
	// });

	const issue = await jira.issues.getIssue({ issueIdOrKey: "SCRUM-2" });
	console.log(issue);
}

main();

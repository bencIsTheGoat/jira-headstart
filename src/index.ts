import "dotenv/config";
import github from "./clients/github";

async function main() {
	// const chatCompletion = await openai.chat.completions.create({
	// 	messages: [{ role: "user", content: "Say this is a test" }],
	// 	model: "gpt-4o",
	// });

	const repos = await github.repos.listForUser({
		username: "bencIsTheGoat",
	});

	console.log(repos);
}

main();

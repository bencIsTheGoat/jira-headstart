import openai from "@clients/openai";
import "dotenv/config";

async function main() {
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: "Say this is a test" }],
		model: "gpt-4o",
	});
}

main();

import openai from "@clients/openai";
import { ChatCompletionMessageParam } from "openai/resources";

interface InstructionParams {
	summary: string;
	description: string;
	fileIds: string[];
}

const generateImplementationSteps = async ({
	summary,
	description,
	fileIds,
}: InstructionParams) => {
	const systemPrompt = `
		You will be provided with a several files of code delimited by triple quote.
		You will be provided with a description of the task to complete prefixed with Description: .
		You will be provided with a summary of the task to complete prefixed with Summary: .
		Use this information to provide implementation steps for a developer.
	`;

	const summaryPrompt = `
		Summary: ${summary}
	`;

	const descriptionPrompt = `
		Description: ${description}
	`;

	const filePrompts: ChatCompletionMessageParam[] = [];
	for (const file of fileIds) {
		filePrompts.push({
			role: "developer",
			content: `"""${file}"""`,
		});
	}
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{
				role: "developer",
				content: summaryPrompt,
			},
			{
				role: "developer",
				content: descriptionPrompt,
			},
			...filePrompts,
		],
		model: "gpt-4o",
	});
	console.log("Generated instructions: ");
	console.log(completion.choices[0].message.content);
	return completion;
};

export default generateImplementationSteps;

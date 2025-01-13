import config from "@config";
import env from "@env";
import OpenAI from "openai";

export default new OpenAI({
	apiKey: env.OPENAI_API_KEY,
	project: config.openai.project,
});

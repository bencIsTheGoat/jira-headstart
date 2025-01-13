import env from "@env";
import OpenAI from "openai";

export default new OpenAI({
	apiKey: env.OPENAI_API_KEY,
	project: "proj_Peg532Z3f8yZdSWMd3g8pBOC",
});

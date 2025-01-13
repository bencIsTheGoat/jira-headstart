import z from "zod";

/**
 * This module exports type-safe environment variables.
 *
 * To add environment variables:
 *
 * 	1. Add env variable to local .env file, or wherever you keep env variables (.zshrc/bashrc)
 * 	2. Add the env variable name to the `envSchema` below (name must match with envSchema key)
 *
 * To use env variables in code:
 *
 * 	1. Import env via env alias `import env from "@env";`
 * 	2. Key into env object, autocomplete will be avaiable `env.OPENAI_API_KEY`
 *
 * Full example:
 *
 * ```
 * import env from "@env";
 * import OpenAI from "openai";
 *
 * export default new OpenAI({
 * 	apiKey: env.OPENAI_API_KEY,
 * });
 * ```
 *
 *
 */
const envSchema = z.object({
	OPENAI_API_KEY: z.string(),
	GITHUB_TOKEN: z.string(),
	// Add env varibles here...
});

export default envSchema.parse(process.env);

import env from "@env";
import { Octokit } from "@octokit/rest";

export default new Octokit({ auth: env.GITHUB_TOKEN });

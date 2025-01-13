import env from "@env";
import { Octokit } from "@octokit/rest";

const oc = new Octokit({ auth: env.GITHUB_TOKEN });

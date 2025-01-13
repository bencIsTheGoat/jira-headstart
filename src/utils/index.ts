import { mkdir, readdir, readFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

type SupportedGitProviders = "GITHUB";

interface RepoInfo {
	gitProvider: SupportedGitProviders;
	name: string;
	owner: string;
}

const getRepoInfo = (rawURL: string): RepoInfo => {
	const url = new URL(rawURL);
	switch (url.hostname) {
		case "github.com": {
			const paths = url.pathname.split("/");
			return {
				gitProvider: "GITHUB",
				name: paths[2],
				owner: paths[1],
			};
		}
		default: {
			console.error(`Error handling unknown git hostname: ${url.hostname}`);
			throw new Error("UNKNOWN_GIT_HOSTNAME");
		}
	}
};

const createTempDir = async (dirName: string): Promise<string> => {
	const td = join(tmpdir(), dirName);
	await mkdir(td, { recursive: true });
	console.log(`Created temporary directory: ${td}`);
	return td;
};

const readDirFiles = async (dir: string): Promise<string[]> => {
	const files = await readdir(dir);
	const uploads = await Promise.all(
		files.map((file) => readFile(join(dir, file)))
	);
	console.log(`Read all files from directory: ${dir}`);
	return uploads.map((u) => u.toString("utf-8"));
};

export default {
	getRepoInfo,
	createTempDir,
	readDirFiles,
};

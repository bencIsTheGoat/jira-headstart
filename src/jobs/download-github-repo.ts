import github from "@clients/github";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { join } from "path";

interface DownloadRepoParams {
	owner: string;
	repoName: string;
	path: string;
	destination: string;
}

const downloadGithubRepo = async ({
	owner,
	repoName,
	path,
	destination,
}: DownloadRepoParams) => {
	const { data } = await github.repos.getContent({
		owner: owner,
		repo: repoName,
		path,
	});
	if (Array.isArray(data)) {
		await Promise.all(
			data.map((d) =>
				downloadGithubRepo({ owner, repoName, path: d.path, destination })
			)
		);
	} else if (data.type === "file") {
		const fp = join(destination, `${randomUUID()}.txt`);
		const utf = Buffer.from(data.content, "base64").toString("utf-8");
		await writeFile(fp, utf);
	}
};

export default downloadGithubRepo;

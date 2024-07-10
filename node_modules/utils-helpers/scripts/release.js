'use strict';

const { Octokit } = require('@octokit/rest');
const { exec } = require('child_process');
const { promisify } = require('util');
const readline = require('readline');

const execPromise = promisify(exec);

const octokit = new Octokit({
    auth: process.env.GIT_TOKEN
});

const askUser = (question) => {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readLine.question(question, (answer) => {
            readLine.close();
            resolve(answer);
        });
    });
};

const getGitInfo = async () => {
    const url = (await execPromise('git config --get remote.origin.url')).stdout;

    const owner = url.split(':')[1].split('/')[0];
    const repo = url.split(':')[1].split('/')[1].replace('.git', '').replace('\n', '');

    return { owner, repo };
};

const getTag = () => {
    const version = require('../package.json').version;
    const prerelease = Number(version.split('.')[0]) === 0;
    return { prerelease, tag: `${version}${prerelease ? '-beta' : ''}` };
};

const getLastTag = async (owner, repo) => {
    const latestRelease = await octokit.repos.getLatestRelease({
        owner,
        repo
    });
    return latestRelease.tag_name;
};

const release = async () => {
    const { owner, repo } = await getGitInfo();
    const { tag } = getTag();

    const lastTag = await getLastTag(owner, repo);

    if (tag === lastTag) throw new Error('Increase version in package.json');

    if (await askUser('Do you want to make release? (y/n): ') !== 'y') return;

    if (!('GIT_TOKEN' in process.env)) throw new Error('Environment variable GIT_TOKEN is not set.');

    const body = await askUser('Add text describing the content of the release: ');

    await octokit.repos.createRelease({
        owner,
        repo,
        body,
        tag_name: tag
    });
};

release().catch(console.error);

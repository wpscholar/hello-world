const core = require('@actions/core');
const github = require('@actions/github');

async function run() {

  try {

    // Get payload
    const payload = github.context.payload;

    console.log(payload);

    const repositoryName = payload.repository.name.toLowerCase();
    const ownerName = payload.repository.owner.name.toLowerCase();

    console.log(repositoryName, ownerName);

    const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
    const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');
    const isRelease = payload.hasOwnProperty('release');

    console.log(isBranch, isTag, isRelease);

    const branchName = isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : null;
    const tagName = isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : null;
    const releaseId = isRelease ? payload.release.id : null;

    console.log(branchName, tagName, releaseId);

    core.setOutput('payload', payload);
    core.setOutput('repositoryName', repositoryName);
    core.setOutput('ownerName', ownerName);
    core.setOutput('isBranch', isBranch);
    core.setOutput('isTag', isTag);
    core.setOutput('isRelease', isRelease);
    core.setOutput('branchName', branchName);
    core.setOutput('tagName', tagName);
    core.setOutput('releaseId', releaseId);

  } catch(error) {

    core.setFailed(error.message);

  }

}

run();

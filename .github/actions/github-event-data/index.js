const core = require('@actions/core');
const github = require('@actions/github');

try {

  // Get payload
  const payload = github.context.payload;

  console.log(payload);

  const repositoryName = github.context.payload.repository.name.toLowerCase();
  core.setOutput('repositoryName', repositoryName);

  const ownerName = payload.repository.owner.name.toLowerCase();
  core.setOutput('ownerName', ownerName);

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
  core.setOutput('isBranch', isBranch);

  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');
  core.setOutput('isTag', isTag);

  const isRelease = payload.hasOwnProperty('release');
  core.setOutput('isRelease', isRelease);

  const branchName = isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : null;
  core.setOutput('branchName', branchName);

  const tagName = isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : null;
  core.setOutput('tagName', tagName);

  const releaseId = isRelease ? payload.release.id : null;
  core.setOutput('releaseId', releaseId);

} catch(error) {

  core.setFailed(error.message);

}

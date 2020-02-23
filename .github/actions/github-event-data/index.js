const core = require('@actions/core');
const github = require('@actions/github');

try {

  // Get payload
  const payload = github.context.payload;

  const repositoryName = github.context.payload.repository.name;
  core.setOutput('repositoryName', repositoryName);

  const ownerName = payload.repository.owner.name;
  core.setOutput('ownerName', ownerName);

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');

  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');  core.setOutput('isTag', isTag);

  const isRelease = payload.hasOwnProperty('release');

  const branchName = isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '';
  core.setOutput('branchName', branchName);

  const tagName = isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '';
  core.setOutput('tagName', tagName);

  const releaseId = isRelease ? payload.release.id : '';
  core.setOutput('releaseId', releaseId);

} catch(error) {

  console.log(error);

  core.setFailed(error.message);

}

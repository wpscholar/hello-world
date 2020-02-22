const core = require('@actions/core');
const github = require('@actions/github');

try {

  // Get payload
  const payload = github.context.payload;

  console.log(payload);

  const repositoryName = payload.repository.name.toLowerCase();
  const ownerName = payload.repository.owner.name.toLowerCase();

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tag');
  const isRelease = payload.hasOwnProperty('release');

  const branchName = isBranch ? payload.ref.replace('refs/heads/', '') : null;
  const tagName = isTag ? payload.ref.replace('refs/tags/', '') : null;
  const releaseId = isRelease ? payload.release.id : null;

  core.setOutput('payload', payload);
  core.setOutput('repositoryName', repositoryName);
  core.setOutput('ownerName', ownerName);
  core.setOutput('isBranch', isBranch);
  core.setOutput('isTag', isTag);
  core.setOutput('isRelease', isRelease);
  core.setOutput('branchName', branchName);
  core.setOutput('tagName', tagName);
  core.setOutput('releaseId', releaseId);

  console.log(
    repositoryName,
    ownerName,
    isBranch,
    branchName,
    isTag,
    tagName,
    isRelease,
    releaseId,
    payload,
    JSON.stringify(payload, undefined, 2)
  );

} catch(error) {

  core.setFailed(error.message);

}

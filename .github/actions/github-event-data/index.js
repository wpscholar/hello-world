const core = require('@actions/core');
const github = require('@actions/github');

try {

  // Get payload
  const payload = github.context.payload;

  const repositoryName = payload.repository.name || '';
  core.setOutput('repositoryName', repositoryName.toLowerCase());

  const ownerName = payload.repository.owner.name || payload.repository.owner.login || '';
  core.setOutput('ownerName', ownerName.toLowerCase());

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');
  const isRelease = payload.hasOwnProperty('release');

  core.setOutput('branchName', isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '');
  core.setOutput('tagName', isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '');
  core.setOutput('releaseId', isRelease ? String(payload.release.id) : '');

} catch(error) {

  core.setFailed(error.message);

}

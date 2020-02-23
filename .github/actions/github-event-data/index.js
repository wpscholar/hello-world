const core = require('@actions/core');
const github = require('@actions/github');

try {

  // Get payload
  const payload = github.context.payload;

  core.setOutput('repositoryName', payload.repository.name.toLowerCase() || '');
  core.setOutput('ownerName', payload.repository.owner.name.toLowerCase() || payload.repository.owner.login.toLowerCase() || '');

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');
  const isRelease = payload.hasOwnProperty('release');

  core.setOutput('branchName', isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '');
  core.setOutput('tagName', isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '');
  core.setOutput('releaseId', isRelease ? String(payload.release.id) : '');

} catch(error) {

  core.setFailed(error.message);

}

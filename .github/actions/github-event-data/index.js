const core = require('@actions/core');
const github = require('@actions/github');

try {

  core.setOutput('string');
  console.log('Success: string');

  core.setOutput(true);
  console.log('Success: boolean true');

  core.setOutput(false);
  console.log('Success: boolean false');

  core.setOutput(1);
  console.log('Success: integer');

  core.setOutput(null);
  console.log('Success: null');

  core.setOutput({a: 'b'});
  console.log('Success: object');

  // Get payload
  /*const payload = github.context.payload;

  console.log(payload);

  const repositoryName = github.context.payload.repository.name;
  core.setOutput('repositoryName', repositoryName);

  const ownerName = payload.repository.owner.name;
  core.setOutput('ownerName', ownerName);

  const isBranch = payload.hasOwnProperty('ref') && payload.ref.includes('heads');
  core.setOutput('isBranch', isBranch);

  const isTag = payload.hasOwnProperty('ref') && payload.ref.includes('tags');
  core.setOutput('isTag', isTag);

  const isRelease = payload.hasOwnProperty('release');
  core.setOutput('isRelease', isRelease);

  const branchName = isBranch ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '';
  core.setOutput('branchName', branchName);

  const tagName = isTag ? payload.ref.substr('refs/tags/'.length, payload.ref.length) : '';
  core.setOutput('tagName', tagName);

  const releaseId = isRelease ? payload.release.id : '';
  core.setOutput('releaseId', releaseId);*/

} catch(error) {

  core.setFailed(error.message);

}

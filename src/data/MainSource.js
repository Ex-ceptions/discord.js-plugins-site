import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set(['gh-pages', 'website', 'docs']);
export default new DocsSource({
  id: 'plugins',
  name: 'discord.js-plugins',
  global: 'Plugins',
  repo: 'djs-plugins/discord.js-plugins',
  defaultTag: 'master',
  branchFilter: branch => !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
  tagFilter: tag => semver.gt(tag.replace(/^v/, ''), '0.4.1'),
});

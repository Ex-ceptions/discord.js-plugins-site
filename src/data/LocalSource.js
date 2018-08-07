import request from 'superagent/superagent';

class LocalSource {
  constructor() {
    this.id = 'local';
    this.name = 'local';
    this.global = 'Plugins';
    this.repo = 'local';
    this.defaultTag = 'local';
    this.defaultFile = { category: 'general', id: 'welcome' };
    this.source = `https://github.com/NbOpposite/discord.js-plugins/blob/`;
    this.tags = null;
    this.recentTag = null;
  }

  fetchTags() {
    this.tags = ['local'];
    return Promise.resolve(this.tags);
  }

  fetchDocs() {
    return request.get(`http://localhost:8080/static/docs.json`).then(res =>
      JSON.parse(res.text)
    );
  }
}
export default new LocalSource();

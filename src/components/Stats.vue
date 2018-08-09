<template>
  <ul class="stats">
    <li v-if="downloads">{{ downloads }} download{{ downloads === '1' ? '' : 's' }}</li>
    <li v-if="stars">{{ stars }} star{{ stars === '1' ? '' : 's' }}</li>
    <li v-if="contributors">{{ contributors }} contributor{{ contributors === '1' ? '' : 's' }}</li>
  </ul>
</template>

<script>
  import request from 'superagent/superagent';

  const data = {
    downloads: '',
    stars: '',
    contributors: '',
    fetching: false,
  };

  export default {
    name: 'stats',

    data() {
      if (data.fetching) return data;
      data.fetching = true;

      request.get('https://api.npmjs.org/downloads/range/2018-08-06:2100-08-21/discord.js-plugins').end((err, res) => {
        if (err) return;
        data.downloads = 0;
        for (const item of res.body.downloads) data.downloads += item.downloads;
        data.downloads = data.downloads.toLocaleString();
      });
      request.get('https://api.github.com/repos/djs-plugins/discord.js-plugins').end((err, res) => {
        if (!err) data.stars = res.body.stargazers_count.toLocaleString();
      });
      request.get('https://api.github.com/repos/djs-plugins/discord.js-plugins/stats/contributors').end((err, res) => {
        if (!err) data.contributors = res.body.length.toLocaleString();
      });

      return data;
    },
  };
</script>

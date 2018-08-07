<template>
  <span class="docs-type-link-with-generic">
    <template v-for="tokens of tokenTypes">
        <template v-for="token of tokens">
            <type-link :key="token.token" :type="[token.token]" :docs="docs">{{ token.token }}</type-link>
        </template>
    </template>
  </span>
</template>

<script>
  import TypeLink from './TypeLink.vue';
  import tokenize from '../../tokenize.js';
  export default {
    components: {
      TypeLink,
    },
    name: 'type-link-with-generic',
    props: ['docs', 'type'],
    computed: {
      tokenTypes() {
        return this.type.map(e => tokenize(e));
      },
    },
  };
</script>

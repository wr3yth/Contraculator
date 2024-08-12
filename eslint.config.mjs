import {createConfigForNuxt} from '@nuxt/eslint-config/flat';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default createConfigForNuxt()
  .append(prettierRecommended)
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  });

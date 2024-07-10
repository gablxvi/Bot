'use strict';

module.exports = {
    env: {
        node: true,
        commonjs: true,
        jest: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        sourceType: 'script'
    },
    rules: {
        semi: ['error', 'always'],
        indent: ['error', 4],
        strict: ['error', 'global'],
        'max-len': ['error', { code: 140 }],
        'no-extra-boolean-cast': 0
    }
};

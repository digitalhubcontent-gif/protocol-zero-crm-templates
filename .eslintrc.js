/**
 * ESLint Configuration
 * Ensures code quality and consistency
 */

module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'warn',
  },
};

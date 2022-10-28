module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*', 'custom-webpack.config.js', 'src/generated/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier'
      ],
      plugins: ['import'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        'import/order': [
          'warn',
          {
            pathGroups: [
              {
                pattern: '.+(css|png|sass|less|scss|pcss|styl)',
                group: 'unknown',
                position: 'after'
              },
              {
                pattern: '@*/**',
                group: 'external',
                position: 'before'
              },
              {
                pattern: '@app/**',
                group: 'external',
                position: 'after'
              }
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-router-dom', 'classnames'],
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            warnOnUnassignedImports: true
          }
        ],
        'import/no-extraneous-dependencies': [
          'warn',
          {
            devDependencies: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx', 'src/tests/**/*'],
            peerDependencies: false,
            optionalDependencies: false
          }
        ],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true
          }
        ],
        'import/no-unresolved': 'off',
        '@angular-eslint/component-selector': 'off',
        '@angular-eslint/directive-selector': 'off',
        'arrow-parens': ['off', 'always'],
        'brace-style': ['off', 'off'],
        'linebreak-style': 'off',
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-extra-semi': 'off',
        'no-irregular-whitespace': 'off',
        'no-trailing-spaces': 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-wrap-multilines': 'off',
        'space-in-parens': ['off', 'never'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true
          }
        ]
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    }
  ]
};

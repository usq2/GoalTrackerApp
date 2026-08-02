module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type validation
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white space, formatting, semicolons, etc)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests or correcting existing tests
        'chore', // Changes to the build process, dependency manager, CI/CD configuration, or auxiliary tools
        'ci', // Changes to CI/CD configuration files and scripts
        'revert', // Reverts a previous commit
      ],
    ],

    // Type must be lowercase
    'type-case': [2, 'always', 'lowercase'],

    // Type cannot be empty
    'type-empty': [2, 'never'],

    // Scope can be empty or provided
    'scope-empty': [0, 'never'],

    // Scope case must be lowercase
    'scope-case': [2, 'always', 'lowercase'],

    // Subject cannot be empty
    'subject-empty': [2, 'never'],

    // Subject cannot end with period
    'subject-full-stop': [2, 'never', '.'],

    // Subject case must be lowercase
    'subject-case': [2, 'always', 'lower-case'],

    // Subject max length (conventional commits recommendation: 50, but we allow 72)
    'subject-max-length': [2, 'always', 100],

    // Body max line length
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],

    // Footer max line length
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
};

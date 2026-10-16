module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // Matches 1 or more ticket tags: [T-001], [T-001][T-002], [ABC-1][DEF-2][GHI-3], etc.
      headerPattern: /^((?:\[[A-Za-z0-9]+-[0-9]+\])+)\s+(\w+)(?:\((.*)\))?:\s+(.*)$/,
      headerCorrespondence: ['tickets', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // Require valid ticket tags at the start
    'header-tickets-valid': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'header-tickets-valid': parsed => {
          const { tickets } = parsed;

          // Check if tickets prefix exists
          if (!tickets) {
            return [
              false,
              'Commit message must start with 1 or more ticket IDs (e.g., "[T-001] feat: message" or "[T-001][T-002] feat: message")',
            ];
          }

          // Validate each ticket match inside [ ]
          const ticketMatches = tickets.match(/\[[A-Za-z0-9]+-[0-9]+\]/g);

          if (!ticketMatches || ticketMatches.join('') !== tickets) {
            return [
              false,
              'Invalid ticket format. Ensure all tickets follow [PREFIX-NUMBER] without extra characters inside or between brackets.',
            ];
          }

          return [true];
        },
      },
    },
  ],
};

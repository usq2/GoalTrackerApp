export const seed = {
  title: '30-Day Focus Plan',
  mission: {
    duration: '30 days',
    priorities: [
      'Reach 78 kg (long-term goal) by consistently losing weight.',
      'Become an exceptional software developer through deliberate practice.',
    ],
  },
  weekday_timetable: [
    {
      time: '6:00 AM',
      activity: 'Wake up, hydrate, freshen up',
    },
    {
      time: '6:30--8:00 AM',
      activity: 'Morning workout (Strength + Cardio)',
    },
    {
      time: '8:00--8:30 AM',
      activity: 'High-protein breakfast',
    },
    {
      time: '8:30--9:00 AM',
      activity: 'Get ready for work',
    },
    {
      time: '9:00 AM--7:00 PM',
      activity: 'Office',
    },
    {
      time: '7:00--7:15 PM',
      activity: 'Light snack (protein + fruit)',
    },
    {
      time: '7:15--8:45 PM',
      activity: 'Deep Learning Block (90 minutes)',
    },
    {
      time: '8:45--9:15 PM',
      activity: 'Dinner',
    },
    {
      time: '9:15--10:00 PM',
      activity: 'Light workout (walk, mobility, stretching, core)',
    },
    {
      time: '10:00--10:30 PM',
      activity: 'Read / Wind down',
    },
    {
      time: '10:30 PM',
      activity: 'Sleep',
    },
  ],
  workout_plan: {
    morning: {
      duration: '90 min',
      activities: ['60--70 min strength training', '20--30 min cardio'],
    },
    night: {
      duration: '30--45 min',
      activities: ['Brisk walk / cycling', 'Mobility & stretching', 'Core'],
    },
  },
  learning_plan: {
    Monday: 'DSA',
    Tuesday: 'Backend (Node.js, APIs, Databases)',
    Wednesday: 'System Design',
    Thursday: 'React / Frontend Architecture',
    Friday: 'Build Project / GitHub',
    Saturday: ['Long coding session (3--4 hours)', 'DSA revision'],
    Sunday: ['Weekly review', 'Meal prep', 'Recovery'],
  },
  daily_scorecard: {
    fitness: [
      'Stayed in calorie deficit (~500 kcal)',
      'Burned ~500 kcal through exercise',
      'Hit protein target (120--150 g)',
      'Morning workout completed',
      'Night workout completed',
    ],
    developer: [
      '90 minutes of focused learning',
      'No distractions during deep work',
      'Learned one meaningful concept or shipped code',
    ],
  },
  weekly_checkin: {
    send_fields: {
      weight: [
        'Current weight',
        'Average calories',
        'Workout consistency (out of 7)',
        'Biggest challenge',
      ],
      developer: [
        'Hours studied',
        'Topics completed',
        'GitHub commits/projects',
        'Biggest blocker',
      ],
      mindset: ['Biggest win this week', 'Biggest mistake', 'One thing to improve next week'],
    },
    assistant_actions: [
      'Review your progress.',
      'Adjust your calorie or workout plan if needed.',
      'Rebalance your learning roadmap.',
      'Help solve any technical blockers.',
      'Keep you accountable.',
    ],
  },
  monthly_success_criteria: {
    fitness: ['Weight trending downward.', '≥25 days in calorie deficit.', '≥25 morning workouts.'],
    developer: [
      '~45 hours of focused study.',
      'Consistent project progress.',
      'Better problem-solving and system design understanding.',
    ],
  },
  rule_for_the_month: {
    questions: ['Did I become healthier today?', 'Did I become a better developer today?'],
    criteria: "If both answers are 'Yes', the day was a success.",
  },
};

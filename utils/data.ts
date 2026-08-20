export function getScoreFromGoals(goals) {
  let localtotal = 0,
    score = 0;
  for (const [key, value] of Object.entries(goals)) {
    localtotal += Object.keys(value).length;
    Object.values(value).forEach(val => {
      if (val) score += 1;
    });
  }
  return `${score}/${localtotal}`;
}

export function PrepLineChartData(weightsArray: Array<{ date: string; weight: string }>) {
  // input -> [{date: 'TUE aug 8 2026', weight: '86.7'}]

  return weightsArray.map(data => {
    return {
      label: data.date.split(' ')[2],
      value: Number(data.weight),
    };
  });
}

export function PrepBarChartData(
  scores: Array<{ date: string; report: Record<string, Record<string, boolean>> }>,
) {
  const calculatedScores = scores.map(obj => {
    return {
      label: obj.date.split(' ')[2],
      value: Number(getScoreFromGoals(obj.report).split('/')[0]),
    };
  });

  return calculatedScores;
}

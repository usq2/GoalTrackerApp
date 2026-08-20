import { Cache } from '../../cache/cache.service';

import { DSPCard } from './DSPCard';

export const Schedule = () => {
  const storedLearningPlan = Cache.getLearningPlan();
  if (storedLearningPlan) {
    return Object.entries(storedLearningPlan).map((entry, index) => {
      return (
        <DSPCard
          day={entry[0]}
          activity={entry[1] as string | string[]}
          key={entry[0]}
          last={index === storedLearningPlan.length - 1}
        />
      );
    });
  } else {
    return <></>;
  }
};

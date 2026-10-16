import { View, Text } from 'react-native';

import { Cache } from '@modules/cache/cache.service';
import { BaseCard } from '@ui/atoms/BaseCard';
import { QuestionMarkIcon } from '@ui/icons/QuestionMark';

import { useTheme } from '@app/hooks/useTheme';

import { applyStyles } from './Questions.styles';

export const DailyQuestions = () => {
  const { colors, spacing } = useTheme();
  const dailyQuestions = Cache.getDailyRules();
  const styles = applyStyles(colors, spacing);
  return (
    <BaseCard
      last={false}
      cardStyles={styles.containerStyle}
      Heading={
        <View style={styles.heading}>
          {dailyQuestions.questions.map((text: string, index: number) => {
            return (
              <Text style={styles.text} key={index}>
                {text}
              </Text>
            );
          })}
        </View>
      }
      Logo={<QuestionMarkIcon size={32} color={colors.warning_heading} />}
    />
  );
};

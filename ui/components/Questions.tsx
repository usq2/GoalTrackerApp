import { View, Text, StyleSheet } from 'react-native';

import { Cache } from '../../cache/cache.service';
import { ColorPallete } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';
import { BaseCard } from '../atoms/BaseCard';
import { QuestionMarkIcon } from '../icons/QuestionMark';

export const DailyQuestions = () => {
  const { colors, spacing } = useTheme();
  const dailyQuestions = Cache.getDailyRules();
  const styles = applyStyles(colors);
  return (
    <BaseCard
      cardStyles={{
        backgroundColor: colors.on_surface,
        padding: spacing.stack_sm,
        flexDirection: 'row',
      }}
      Heading={
        <View style={{ flex: 1, alignItems: 'flex-start', marginStart: spacing.stack_lg }}>
          {dailyQuestions.questions.map((text: string, index: number) => {
            return (
              <Text style={styles.text} key={index}>
                {text}
              </Text>
            );
          })}
        </View>
      }
      Logo={<QuestionMarkIcon size={32} color={colors.primary} />}
    />
  );
};

const applyStyles = (colors: ColorPallete) => {
  return StyleSheet.create({
    text: {
      fontSize: 14,
      fontFamily: 'Inter',
      color: colors.on_secondary,
    },
  });
};

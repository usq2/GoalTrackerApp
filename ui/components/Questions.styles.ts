import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: colors.surface_container_high,
      padding: spacing.stack_sm,
      flexDirection: 'row',
      margin: spacing.container_margin,
      borderRadius: spacing.round,
      borderWidth: 1,
      borderColor: colors.warning,
    },
    heading: { flex: 1, alignItems: 'flex-start', marginStart: spacing.stack_lg },
    text: {
      fontSize: 14,
      fontFamily: 'HankenGrotesk-Regular',
      color: colors.on_secondary,
    },
  });
};

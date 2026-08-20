import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    outerCard: {
      flexDirection: 'row',
    },
    card: {
      flexDirection: 'row',
      marginHorizontal: 10,
      backgroundColor: colors.surface,
      marginBottom: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border_light,
      borderRadius: 8,
      flex: 3,
    },

    textContainer: {
      flex: 3,
      gap: 10,
      paddingHorizontal: spacing.stack_sm,
      paddingVertical: spacing.stack_md,
      borderLeftWidth: 3,
      borderColor: colors.warning_heading,
      borderLeftColor: colors.warning,
      borderRadius: spacing.round,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    time: {
      fontSize: 16,
      color: colors.on_surface_bright_variant,
    },
    heading: {
      color: colors.on_background,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'HankenGrotesk-Bold',
    },
  });
};

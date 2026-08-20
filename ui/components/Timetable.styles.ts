import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing, active: boolean) => {
  return StyleSheet.create({
    outerCard: {
      marginBottom: spacing.container_margin,
      backgroundColor: colors.surface_container_low,
      padding: spacing.base_unit,
      borderWidth: 1,
      borderColor: colors.border_light,
      borderRadius: spacing.round,
    },
    textContainer: {
      gap: 10,
      paddingHorizontal: spacing.stack_sm,
      paddingVertical: spacing.stack_md,
      borderLeftWidth: 3,
      borderColor: active ? colors.success : colors.border_light,
      borderWidth: 2,
      borderRadius: spacing.round,
      marginEnd: spacing.gutter,
      backgroundColor: active ? colors.active_light_bg : colors.surface_container_lowest,
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: spacing.stack_md,
    },
    now: {
      color: colors.on_background,
    },
    time: {
      fontSize: 16,
      fontFamily: 'HankenGrotesk-Regular',
      color: colors.on_surface_variant,
    },
    heading: {
      color: colors.on_background,
      paddingVertical: spacing.gutter,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: 'Roboto',
    },
  });
};

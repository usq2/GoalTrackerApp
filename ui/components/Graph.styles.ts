import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    graphHeader: {
      margin: spacing.container_margin,
      color: colors.on_background,
      fontFamily: 'HankenGrotesk-ExtraBold',
    },
    graphContainer: {
      backgroundColor: colors.surface_container_highest,
      borderRadius: spacing.round,
      borderWidth: 1,
      borderColor: colors.border_light,
      margin: spacing.container_margin,
    },
    graphLabels: {
      color: colors.on_surface_bright_variant,
      fontSize: 12,
    },
  });
};

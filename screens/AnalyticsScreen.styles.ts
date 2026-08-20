import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      padding: spacing.container_margin,
    },
    bodyContainer: {
      flex: 4,
      backgroundColor: colors.background,
      gap: 10,
    },
    button: {
      backgroundColor: colors.on_surface,
      borderColor: colors.border_light,
      borderWidth: 3,
      padding: spacing.gutter,
    },
    emphasize: {
      fontSize: 20,
      color: colors.warning_heading,
      fontFamily: 'HankenGrotesk-Bold',
    },

    text: {
      color: colors.on_background,
      flex: 1,
    },
  });

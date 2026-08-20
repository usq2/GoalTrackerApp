import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    bodyContainer: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 10,
      padding: spacing.container_margin,
    },
    heading: {
      fontSize: 24,
      fontFamily: 'roboto',
      fontWeight: 'bold',
      color: colors.surface_bright,
      letterSpacing: 3,
    },
    emphasize: {
      fontSize: 20,
      color: colors.on_background,
      fontFamily: 'sans-serif',
    },
  });

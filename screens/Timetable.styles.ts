import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    headingContainer: {
      alignItems: 'flex-start',
      backgroundColor: colors.background,
      justifyContent: 'flex-start',
      padding: 10,
    },
    bodyContainer: {
      flex: 4,
      backgroundColor: colors.background,
      gap: 10,
      padding: spacing.container_margin,
    },
    emphasize: {
      fontSize: 22,
      color: colors.on_surface_bright_variant,
      fontFamily: 'HankenGrotesk-Medium',
      marginBottom: spacing.base_unit,
    },
  });

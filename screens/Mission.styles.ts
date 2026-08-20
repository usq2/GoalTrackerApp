import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: spacing.container_margin,
    },
    headingContainer: {
      padding: spacing.stack_md,
      alignItems: 'center',
      backgroundColor: colors.surface,
      justifyContent: 'center',
    },
    bodyContainer: {
      backgroundColor: colors.surface_container_low,
      gap: 10,
      padding: spacing.stack_md,
      borderWidth: 1,
      borderColor: colors.border_light,
      margin: spacing.margin,
      borderRadius: spacing.round,
    },
    heading: {
      fontSize: 12,
      fontFamily: 'HankenGrotesk-Bold',
      color: colors.on_surface_bright_variant,
      letterSpacing: 1,
      marginBottom: spacing.base_unit,
    },
    goalHeading: {
      fontSize: 24,
      fontFamily: 'HankenGrotesk-ExtraBold',
      color: colors.on_background,
      marginBottom: spacing.base_unit,
    },
    emphasize: {
      fontSize: 48,
      fontFamily: 'HankenGrotesk-ExtraBold',
      color: colors.warning_heading,
      letterSpacing: -1,
      marginBottom: spacing.base_unit,
    },
  });

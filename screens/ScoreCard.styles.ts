import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    heading: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.gutter,
      padding: spacing.container_margin,
    },
    sectionCard: {
      backgroundColor: colors.surface_container_low,
      marginVertical: spacing.base_unit,
      borderRadius: spacing.round,
      borderWidth: 1,
      borderColor: colors.border_light,
    },
    input: {
      margin: spacing.stack_sm,
      backgroundColor: colors.surface_container_highest,
      borderRadius: spacing.round,
      padding: spacing.base_unit,
      borderColor: colors.outline,
      color: colors.on_background,
    },
    headerText: {
      fontSize: 20,
      color: colors.primary,
    },
    bodyContainer: {
      flex: 2,
      backgroundColor: colors.background,
      gap: 10,
      padding: spacing.container_margin,
    },
    spacing: { paddingStart: 10, marginBottom: 10 },
    checkHeader: {
      color: colors.on_background,
      textTransform: 'uppercase',
      margin: spacing.gutter,
      fontSize: 24,
      fontFamily: 'HankenGrotesk-Bold',
    },
  });

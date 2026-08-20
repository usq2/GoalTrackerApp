import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.surface_container_high,
      borderRadius: spacing.round,
      padding: 20,
      width: 280,
      alignItems: 'flex-start',
    },

    chartWrapper: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface_container_high,
      marginVertical: 10,
      padding: spacing.container_margin,
      borderRadius: spacing.round,
    },
    centerLabel: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface_container_high,
    },
    scoreText: {
      color: colors.success,
      fontSize: 38,
      fontFamily: 'HankenGrotesk-ExtraBold',
    },
  });

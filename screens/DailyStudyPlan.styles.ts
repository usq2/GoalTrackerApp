import { StyleSheet } from 'react-native';

import { ColorPallete } from '../contexts/types';

export const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
    },
    bodyContainer: {
      flex: 4,
      backgroundColor: colors.background,
      gap: 10,
    },

    emphasize: {
      fontSize: 20,
      color: colors.on_background,
      fontFamily: 'HankenGrotesk-Bold',
    },
  });

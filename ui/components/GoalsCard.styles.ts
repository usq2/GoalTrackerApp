import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.stack_md,
    },
    textContainer: { flex: 3, gap: 10, paddingVertical: spacing.stack_md },
    text: {
      color: colors.on_background,
      fontSize: 16,
      fontFamily: 'HankenGrotesk-Medium',
    },
    heading: {
      color: colors.on_background,
      fontSize: 22,
      fontFamily: 'HankenGrotesk-Bold',
    },
  });
};

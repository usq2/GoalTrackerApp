import { StyleSheet } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete, spacing: Spacing, last: boolean) => {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginBottom: spacing.gutter,
      borderBottomWidth: last ? 0 : 1,
      borderBottomColor: colors.border_light,
    },
  });
};

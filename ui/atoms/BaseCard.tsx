import { ReactNode } from 'react';

import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { ColorPallete, Spacing } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';

export const BaseCard = ({
  Logo,
  Heading,
  cardStyles,
}: {
  Logo?: ReactNode;
  Heading?: ReactNode;
  cardStyles?: StyleProp<ViewStyle>;
}) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing);
  return (
    <View style={cardStyles ? cardStyles : styles.card}>
      {Logo ? Logo : <></>}
      {Heading ? Heading : <></>}
    </View>
  );
};
const applyStyles = (colors: ColorPallete, spacing: Spacing) => {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginHorizontal: 10,
      backgroundColor: colors.background,
      marginBottom: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.inverse_surface,
      borderRadius: 5,
    },
  });
};

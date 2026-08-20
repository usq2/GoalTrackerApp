import { ReactNode } from 'react';

import { View, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

import { applyStyles } from './BaseCard.styles';

export const BaseCard = ({
  Logo,
  Heading,
  cardStyles,
  last,
}: {
  Logo?: ReactNode;
  Heading?: ReactNode;
  cardStyles?: StyleProp<ViewStyle>;
  last: boolean;
}) => {
  const { colors, spacing } = useTheme();
  const styles = applyStyles(colors, spacing, last);
  return (
    <View style={cardStyles ? cardStyles : styles.card}>
      {Logo ? Logo : <></>}
      {Heading ? Heading : <></>}
    </View>
  );
};

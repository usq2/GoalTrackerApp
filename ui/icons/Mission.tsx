import Ionicons from '@react-native-vector-icons/ionicons';

import { useTheme } from '../../hooks/useTheme';
import { IconProps } from '../types/Icon.types';

export const MissionIcon = ({ focused, size, testID }: IconProps) => {
  const { colors } = useTheme();
  return (
    <Ionicons
      name={focused ? 'rocket' : 'rocket-outline'}
      color={focused ? colors.primary : colors.inverse_primary}
      size={size}
      testID={`${testID}-MissionIcon`}
    />
  );
};

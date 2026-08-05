import Ionicons from '@react-native-vector-icons/ionicons';

import { useTheme } from '../../hooks/useTheme';
import { IconProps } from '../types/Icon.types';

export const ScoreCardIcon = ({ focused, size, testID }: IconProps) => {
  const { colors } = useTheme();
  return (
    <Ionicons
      name={focused ? 'trophy-sharp' : 'trophy'}
      color={focused ? colors.primary : colors.inverse_primary}
      size={size}
      testID={`${testID}-MissionIcon`}
    />
  );
};

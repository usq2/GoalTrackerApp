import Ionicons from '@react-native-vector-icons/ionicons';

import { IconProps } from '@ui/types/Icon.types';

import { useTheme } from '@app/hooks/useTheme';

export const TimetableIcon = ({ focused, size, testID }: IconProps) => {
  const { colors } = useTheme();
  return (
    <Ionicons
      name={focused ? 'calendar' : 'calendar-outline'}
      color={focused ? colors.active_bottom_icon : colors.inactive_bottom_icon}
      size={size}
      testID={`${testID}-TimetableIcon`}
    />
  );
};

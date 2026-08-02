import Ionicons from '@react-native-vector-icons/ionicons';

import { IconProps } from '../types/Icon.types';

export const TimetableIcon = ({ color, size, testID }: IconProps) => {
  return (
    <Ionicons name="hourglass-sharp" color={color} size={size} testID={`${testID}-TimetableIcon`} />
  );
};

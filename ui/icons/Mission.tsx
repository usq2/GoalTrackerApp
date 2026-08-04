import Ionicons from '@react-native-vector-icons/ionicons';

import { IconProps } from '../types/Icon.types';

export const MissionIcon = ({ color, size, testID }: IconProps) => {
  return (
    <Ionicons name="bonfire-sharp" color={color} size={size} testID={`${testID}-MissionIcon`} />
  );
};

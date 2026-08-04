import Ionicons from '@react-native-vector-icons/ionicons';

import { IconProps } from '../types/Icon.types';

export const ScoreCardIcon = ({ color, size, testID }: IconProps) => {
  return (
    <Ionicons name="trophy-sharp" color={color} size={size} testID={`${testID}-ScoreCardIcon`} />
  );
};

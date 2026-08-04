import Ionicons from '@react-native-vector-icons/ionicons';

import { IconProps } from '../types/Icon.types';

export const ProgressIcon = ({ color, size, testID }: IconProps) => {
  return (
    <Ionicons
      name="trending-up-sharp"
      color={color}
      size={size}
      testID={`${testID}-ProgressIcon`}
    />
  );
};

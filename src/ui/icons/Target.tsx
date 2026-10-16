import Ionicons from '@react-native-vector-icons/ionicons';

export const TargetIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons name={'disc-outline'} color={color} size={size} testID="TargetIcon" />;
};

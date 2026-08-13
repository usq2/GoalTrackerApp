import Ionicons from '@react-native-vector-icons/ionicons';

export const HealthIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons name={'barbell-outline'} color={color} size={size} testID="HealthIcon" />;
};

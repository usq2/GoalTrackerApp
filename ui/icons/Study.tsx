import Ionicons from '@react-native-vector-icons/ionicons';

export const StudyIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons name={'laptop-outline'} color={color} size={size} testID="TargetIcon" />;
};

import Ionicons from '@react-native-vector-icons/ionicons';

export const QuestionMarkIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons name={'help-outline'} color={color} size={size} testID="QuestionMarkIcon" />;
};

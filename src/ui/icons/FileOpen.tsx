import Ionicons from '@react-native-vector-icons/ionicons';

export const FileOpenIcon = ({ color, size }: { color: string; size: number }) => {
  return <Ionicons name={'folder-open-outline'} color={color} size={size} testID="FileOpenIcon" />;
};

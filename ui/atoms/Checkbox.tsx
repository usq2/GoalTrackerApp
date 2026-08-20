import { TouchableOpacity, Text, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { CheckboxProps } from '../types/Checkbox.types';

import { applyStyles } from './Checkbox.styles';

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange, color }) => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View style={[styles.box, value ? styles.checked : styles.unchecked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { ColorPallete } from '../../contexts/types';
import { useTheme } from '../../hooks/useTheme';
import { CheckboxProps } from '../types/Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange, color }) => {
  const { colors } = useTheme();
  const styles = applyStyles(colors);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View style={[styles.box, { borderColor: color }, value && { backgroundColor: color }]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const applyStyles = (colors: ColorPallete) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
    },
    box: {
      width: 22,
      height: 22,
      borderWidth: 2,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    checkmark: {
      color: colors.surface_bright,
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: -2,
    },
    label: {
      fontSize: 16,
      color: colors.surface,
    },
  });

import { StyleSheet } from 'react-native';

import { ColorPallete } from '../../contexts/types';

export const applyStyles = (colors: ColorPallete) =>
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
      color: colors.on_background,
    },
    checked: {
      borderColor: colors.active_light_bg,
      backgroundColor: colors.success,
    },
    unchecked: {
      borderColor: colors.on_surface_variant,
    },
  });

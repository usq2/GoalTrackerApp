import { StyleSheet } from 'react-native';

import { ColorPallete } from '../contexts/types';

export const applyStyles = (colors: ColorPallete) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      borderTopWidth: 1,
      borderColor: colors.surface_container_highest,
      backgroundColor: colors.background,
    },
    button: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: {
      fontSize: 10,
      fontFamily: 'HankenGrotesk-Medium',
      color: colors.inactive_bottom_icon,
      marginTop: 1,
    },
  });
};

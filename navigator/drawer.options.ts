import { StyleSheet, TextStyle } from 'react-native';

import { ColorPallete } from '../contexts/types';

export const getDrawerOptions = (colors: ColorPallete) => {
  return {
    drawerStyle: {
      backgroundColor: colors.surface_container_highest,
      borderRadius: 0,
    },
    drawerLabelStyle: {
      color: colors.on_background,
      fontFamily: 'HankenGrotesk-Regular',
      fontSize: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_light,
    },
    headerStyle: {
      backgroundColor: colors.background,
      borderBottomColor: colors.surface_container_highest,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTintColor: colors.on_background,
    headerTitleStyle: {
      textTransform: 'uppercase',
      fontFamily: 'HankenGrotesk-Bold',
      flex: 1,
      textAlignVertical: 'center',
    } as TextStyle,
  };
};

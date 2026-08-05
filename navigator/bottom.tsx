import { useState } from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ColorPallete } from '../contexts/types';
import { useTheme } from '../hooks/useTheme';
import { MissionIcon } from '../ui/icons/Mission';
import { ProgressIcon } from '../ui/icons/Progress';
import { ScoreCardIcon } from '../ui/icons/ScoreCard';
import { TimetableIcon } from '../ui/icons/Timetable';

export function BottomTabBar() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currFocus, setCurrFocus] = useState('');
  const tabs = [
    { name: 'Mission', icon: MissionIcon, label: 'Mission' },
    { name: 'Timetable', icon: TimetableIcon, label: 'Timetable' },
    { name: 'Scorecard', icon: ScoreCardIcon, label: 'Scorecard' },
    { name: 'Weekly', icon: ProgressIcon, label: 'Weekly' },
  ];
  const styles = applyStyles(colors);
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={styles.button}
          onPress={() => {
            setCurrFocus(tab.name);
            navigation.navigate(tab.name);
          }}
        >
          <tab.icon focused={currFocus === tab.name ? true : false} size={24} testID="tab" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const applyStyles = (colors: ColorPallete) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 60,
      borderTopWidth: 1,
      borderColor: colors.inverse_surface,
      backgroundColor: colors.on_background,
    },
    button: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });
};

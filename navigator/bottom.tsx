import { useState } from 'react';

import { View, TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../hooks/useTheme';
import { MissionIcon } from '../ui/icons/Mission';
import { ProgressIcon } from '../ui/icons/Progress';
import { ScoreCardIcon } from '../ui/icons/ScoreCard';
import { TimetableIcon } from '../ui/icons/Timetable';

import { applyStyles } from './bottom.styles';

const tabs = [
  { name: 'Mission', icon: MissionIcon, label: 'Mission' },
  { name: 'Timetable', icon: TimetableIcon, label: 'Timetable' },
  { name: 'Daily Tasks', icon: ScoreCardIcon, label: 'Scorecard' },
  { name: 'Weekly Progress', icon: ProgressIcon, label: 'Weekly' },
];
export function BottomTabBar() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currFocus, setCurrFocus] = useState('Mission');
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
          <Text style={styles.text}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

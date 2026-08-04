import { createStaticNavigation } from '@react-navigation/native';

import { DrawerNavigator } from './drawer';

const DrawerNavigation = createStaticNavigation(DrawerNavigator);

export { DrawerNavigation };

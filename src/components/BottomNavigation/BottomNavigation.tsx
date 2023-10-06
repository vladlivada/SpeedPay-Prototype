import {Button, View} from 'react-native';
import React from 'react';
import {styles} from './BottomNavigation.style';
import {SCREEN_ROUTES} from '../../utils/constants';
import NavigationButton from '../NavigationButton/NavigationButton';

function BottomNavigation({nav}: {nav: any}): JSX.Element {
  const navigate = (route: SCREEN_ROUTES) => {
    if (nav.isReady()) {
      nav.navigate(route);
    }
  };

  return (
    <View style={styles.bottomNavigation}>
      <NavigationButton
        title="Payments"
        onClick={() => navigate(SCREEN_ROUTES.PAYMENTS)}
      />
      <View style={styles.delimiter} />
      <NavigationButton
        title="Merchants"
        onClick={() => navigate(SCREEN_ROUTES.MERCHANTS)}
      />
    </View>
  );
}
export default BottomNavigation;

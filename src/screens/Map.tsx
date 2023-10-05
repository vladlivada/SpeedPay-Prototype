import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
// @ts-ignore
import {CarPlay, MapTemplate, MapTemplateConfig, NavigationSession,} from 'react-native-carplay';
import MapView from 'react-native-maps';


function NavigationMapView() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: 44.382679,
          longitude: 26.21931,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={StyleSheet.absoluteFillObject}>
      </MapView>
    </View>
  );
}
export function Map() {
  const mapTemplate = useRef<MapTemplate>();

  const onShowAlertPress = () => {
    mapTemplate.current.presentNavigationAlert({
      titleVariants: ['Test 1'],
      primaryAction: { title: 'Test 2' },
      secondaryAction: { title: 'Test 3' },
      duration: 1000,
    });
  };

  const onDismissAlertPress = () => {
    mapTemplate.current.dismissNavigationAlert(true);
  };

  const onShowPanningPress = () => {
    mapTemplate.current.showPanningInterface(true);
  };

  const onDismissPanningPress = () => {
    mapTemplate.current.dismissPanningInterface(true);
  };

  useEffect(() => {
    // change underlying component here
    // within this useEffect based on
    // changing dependencies
    const mapConfig: MapTemplateConfig = {
      component: NavigationMapView,
      onAlertActionPressed(e: any) {
        console.log(e);
      },
      onStartedTrip() {
      },
    };

    if (!mapTemplate.current) {
      mapTemplate.current = new MapTemplate(mapConfig);
    } else {
      mapTemplate.current.updateConfig(mapConfig);
    }

    CarPlay.pushTemplate(mapTemplate.current, false);
    return () => CarPlay.popToRootTemplate(true);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Show alert" onPress={onShowAlertPress} />
      <Button title="Dismiss alert" onPress={onDismissAlertPress} />
    </View>
  );
}

Map.navigationOptions = {
  headerTitle: 'Map Template',
};

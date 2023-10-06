import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import {CarPlay, MapTemplate, MapTemplateConfig, NavigationSession,} from 'react-native-carplay';
import MapView from 'react-native-maps';
import NearbyMerchantsScreen from "../NearbyMerchants/NearbyMerchants";
import CarplayContext from "../../store/carplay-context";
import {BaseEvent} from "react-native-carplay/lib/templates/Template";


interface NavigationMapViewProps {
  ctx: { isConnected: boolean }
}

function NavigationMapView({ctx}: NavigationMapViewProps) {
  return (
    <View style={{ flex: 1 }}>
      <NearbyMerchantsScreen isConnected={ctx.isConnected}></NearbyMerchantsScreen>
    </View>
  );
}
export function Map({navigation}: any) {
  const mapTemplate = useRef<MapTemplate>();
  const ctx = useContext(CarplayContext);
  const onShowAlertPress = () => {
    mapTemplate.current?.presentNavigationAlert({
      titleVariants: ['Test 1'],
      primaryAction: { title: 'Test 2' },
      secondaryAction: { title: 'Test 3' },
      duration: 1000,
    });
  };

  const onDismissAlertPress = () => {
    mapTemplate.current?.dismissNavigationAlert(true);
  };

  const onShowPanningPress = () => {
    mapTemplate.current?.showPanningInterface(true);
  };

  const onDismissPanningPress = () => {
    mapTemplate.current?.dismissPanningInterface(true);
  };

  useEffect(() => {
    // change underlying component here
    // within this useEffect based on
    // changing dependencies
    const mapConfig: MapTemplateConfig = {
      component: () => <NavigationMapView ctx={ctx}/>,
      onWillDisappear(e: BaseEvent) {
        navigation.navigate('Menu')
      },
      onAlertActionPressed(e: any) {

      },
      onStartedTrip() {
      },
    };

    if (!mapTemplate.current) {
      mapTemplate.current = new MapTemplate(mapConfig);
    } else {
      mapTemplate.current?.updateConfig(mapConfig);
    }

    CarPlay.pushTemplate(mapTemplate.current, false);
    return () => CarPlay.popToRootTemplate(true);
  }, [ctx.isConnected]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{textAlign: 'center'}}>App is running in carplay mode now, please check car's entertainment system</Text>
    </View>
  );
}

Map.navigationOptions = {
  headerTitle: 'Map Template',
};

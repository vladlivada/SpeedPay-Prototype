import React, {useContext, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {CarPlay, MapTemplate, MapTemplateConfig} from 'react-native-carplay';
import NearbyMerchantsScreen from "../NearbyMerchants/NearbyMerchants";
import CarplayContext from "../../store/carplay-context";
import {BaseEvent} from "react-native-carplay/lib/templates/Template";
import CarplayMode from "../../components/CarplayMode/CarplayMode";


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
      onPanWithDirection(e: { direction: string }) {
        console.log(e);
      }
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
      <CarplayMode/>
  );
}

Map.navigationOptions = {
  headerTitle: 'Map Template',
};

import React, {useEffect, useState} from 'react';
import {Button, NativeEventEmitter, NativeModules, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Map} from './screens/Map';
import {Menu} from './screens/Menu';
// @ts-ignore
import {CarPlay} from 'react-native-carplay';
import Geolocation from 'react-native-geolocation-service'

import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions'

const Stack = createStackNavigator();

export const App = () => {
  const [carPlayConnected, setCarPlayConnected] = useState(CarPlay.connected);

  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS).then((permission) => {
        if(permission === RESULTS.GRANTED) {
          Geolocation.watchPosition(
            position => {
              console.log(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000} as any,
          )
        }
      }).catch(console.log);
    });

    function onConnect() {
      setCarPlayConnected(true);
    }

    function onDisconnect() {
      setCarPlayConnected(false);
    }

    const emt = new NativeEventEmitter(NativeModules.RNCarPlay);
    emt.addListener('didConnect', () => {
      console.log('CONNECTED!');
    });

    CarPlay.registerOnConnect(onConnect);
    CarPlay.registerOnDisconnect(onDisconnect);

    return () => {
      CarPlay.unregisterOnConnect(onConnect);
      CarPlay.unregisterOnDisconnect(onDisconnect);
    };
  });

  return carPlayConnected ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Map" component={Map}/>
        <Stack.Screen name="Menu" component={Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Please connect Car Play and open the test app</Text>
      <Button title="Connected" onPress={() => setCarPlayConnected(true)}/>
    </View>
  );
};

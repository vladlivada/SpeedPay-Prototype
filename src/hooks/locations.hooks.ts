import {useEffect, useRef, useState} from 'react';
import {Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'

import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions'

export const GetLocations = () => {
  const [currentLocation, setCurrentLocation] = useState(
      {} as any,
  );
  const [initialRegion, setInitialRegion] = useState({} as Region);
  const unsubscribe = useRef(() => undefined);

  useEffect(() => {
    const subscribe = async () => {
      try {
        const permission = await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        if (permissionStatus !== RESULTS.GRANTED) {
          console.log('Permission to access location was denied');
          return;
        }
        Geolocation.getCurrentPosition((position) => {
          setCurrentLocation((prev: any) => {
            return {
              ...prev,
              ...position.coords,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
          });
          setInitialRegion(prev => {
            return {
              ...prev,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
          });
        });

        Geolocation.watchPosition(
            position => {
              setCurrentLocation((prev: any) => {
                return {
                  ...prev,
                  ...position.coords,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                };
              });
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000} as any,
        )
      } catch (error) {
        console.log(error)
      }
    };
    subscribe();
    return () => {
      unsubscribe.current();
    };
  }, []);

  return [initialRegion, currentLocation];
};

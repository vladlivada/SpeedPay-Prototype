import {Image, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import MapView, {Marker, Region} from 'react-native-maps';
import {compareCoordinates} from '../../utils/coordinates';
import {carImageSource} from '../../utils/resources';
import {GetMerchants} from '../../hooks/merchants.hooks';
import {GetLocations} from '../../hooks/locations.hooks';
import {OpenPaymentAlert} from '../../hooks/alert.hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../utils/endpoints';
import {ActionSheetTemplate, CarPlay} from "react-native-carplay";

function NearbyMerchantsScreen({isConnected}: any): JSX.Element {
  const [initialRegion, currentLocation] = GetLocations() as Array<Region>;
  const merchantLocations = GetMerchants();

  async function getUser() {
    return JSON.parse((await AsyncStorage.getItem('user')) as string);
  }

  useEffect(() => {
    const openAlert = async () => {
      const matchedLocation = compareCoordinates(
          currentLocation,
          merchantLocations,
      );
      if (matchedLocation != null) {
        const triggerPayment = async () => {
          const user = await getUser();
          const driverReq = await fetch(
              `${endpoints.base}/${endpoints.operations.driver.path}`,
              {
                method: 'GET',
                headers: {
                  userId: user.id,
                },
              },
          );
          const driver = await driverReq.json();
          const triggerCall = await fetch(
              `${endpoints.base}/${endpoints.operations.trigger.path}/${matchedLocation.id}`,
              {
                method: 'POST',
                headers: {
                  driverID: driver.id,
                },
              },
          );
          if (triggerCall.status === 200) {
            setTimeout(() => {
              fetch(
                  `${endpoints.base}/${endpoints.operations.driver.path}/${driver.id}/transactions`,
              ).then(response => {
                response.json().then(transactions => {
                  if (transactions.length > 0) {
                    const transaction = transactions[transactions.length - 1];
                    const accept = () => {
                      fetch(
                          `${endpoints.base}/${endpoints.operations.payment.confirm}/${transaction.orderId}`,
                          {method: 'POST'},
                      ).then(response => {
                        console.log(response.status);
                      });
                    }
                    const decline = () => {
                      fetch(
                          `${endpoints.base}/${endpoints.operations.payment.decline}/${transaction.orderId}`,
                          {method: 'POST'},
                      ).then(response => {
                        console.log(response.status);
                      });
                    }

                    if(!isConnected) {
                      OpenPaymentAlert(
                          transaction,
                          () => decline(),
                          () => accept(),
                      );
                    } else {
                      const actionSheetTemplate = new ActionSheetTemplate({
                        title:  `Payment to ${transaction.merchant.name}`,
                        message: `Do you accept payment of ${transaction.amount} lei for ${transaction.description}?`,
                        actions: [
                          {
                            id: 'ok',
                            title: 'Accept',
                          },
                          {
                            id: 'remove',
                            title: 'Decline',
                            style: 'destructive',
                          },
                        ],
                        onActionButtonPressed({ id }) {
                          switch (id) {
                            case 'ok':
                              return accept();
                            case 'remove':
                              return decline();
                          }
                        },
                      });

                      CarPlay.presentTemplate(actionSheetTemplate);
                    }

                  }
                });
              });
            }, 1000);
          }
        };
        triggerPayment();
      }
    };
    openAlert()
  }, [currentLocation]);

  return (
      <View style={StyleSheet.absoluteFillObject}>
        <MapView
            initialRegion={initialRegion}
            region={currentLocation}
            style={StyleSheet.absoluteFillObject}>
          {currentLocation && (
              <Marker.Animated
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                  title="Your Location">
                <Image source={carImageSource} style={{height: 35, width: 35}}/>
              </Marker.Animated>
          )}
          {merchantLocations.map((location, index) => (
              <Marker key={index} coordinate={location} title={location.name}/>
          ))}
        </MapView>
      </View>
  );
}

export default NearbyMerchantsScreen;

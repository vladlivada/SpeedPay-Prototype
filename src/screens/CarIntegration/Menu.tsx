import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {CarPlay, ListTemplate} from 'react-native-carplay';

export function Menu({ navigation }: any) {
  useEffect(() => {
    const menuTemplate = new ListTemplate({
      sections: [
        {
          header: 'SpeedPay Titans',
          items: [{ text: 'Nearby Merchants'}, {text: 'Payments'}],
        },
      ],
      title: '',
      backButtonHidden: true,
      async onItemSelect({index}) {
        navigation.navigate(index === 0 ? 'Map' : 'PaymentsView')
      }
    });

    CarPlay.setRootTemplate(menuTemplate);
    return () => CarPlay.popToRootTemplate(true);
  }, []);

  const onMapPress = () => navigation.navigate('Map');
  const onPaymentPress = () => navigation.navigate('PaymentsView');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>App is now in Carplay mode</Text>
    </View>
  );
}

Menu.navigationOptions = {
  headerTitle: 'Car Play Example',
};

import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
// @ts-ignore
import { CarPlay, GridTemplate } from 'react-native-carplay';

const gridItemImage = require('../images/go.png');

export function Menu({ navigation }: any) {
  useEffect(() => {
    const gridTemplate = new GridTemplate({
      buttons: [
        {
          id: 'Map',
          titleVariants: ['Map'],
          image: gridItemImage,
        }
      ],
      onButtonPressed: (menuItem: any) => {
        navigation.navigate(menuItem.id);
      },
      onWillAppear: () => {
        navigation.navigate('Menu');
      },
      title: 'SpeedPay Titans',
    });

    CarPlay.setRootTemplate(gridTemplate);
  }, []);

  const onMapPress = () => navigation.navigate('Map');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Map" onPress={onMapPress} />
    </View>
  );
}

Menu.navigationOptions = {
  headerTitle: 'Car Play Example',
};

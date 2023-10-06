import {Button, View} from 'react-native';
import React from 'react';
import {styles} from './NavigationButton.style';

function NavigationButton({
  title,
  onClick,
}: {
  title: string;
  onClick: Function;
}): JSX.Element {
  return (
    <View style={styles.navigationButton}>
      <Button title={title} onPress={() => onClick()} />
    </View>
  );
}

export default NavigationButton;

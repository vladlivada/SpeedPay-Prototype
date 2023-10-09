import React from "react"
import {Image, Text, View} from "react-native";
import logo from '../../assets/logo/spt-logo.png';
import {styles} from './CarplayMode.style';

const CarplayMode = () => {

  return (
      <View style={styles.container}>
        <Image source={logo} style={{width: 300, height:300}}/>
        <Text style={styles.info}>App is running in Car mode, please check your infotainment system</Text>
      </View>
  )
}

export default CarplayMode;

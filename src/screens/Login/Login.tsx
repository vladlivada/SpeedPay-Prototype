import {Button, Image, Text, TextInput, View} from 'react-native';
import logo from '../../assets/logo/spt-logo.png';
import {styles} from './Login.style';
import {useEffect, useState} from 'react';
import {endpoints} from '../../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginScreen(navigationProps: any) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  async function handleSignIn() {
    if (!isDisabled) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password}),
        };
        const response = await fetch(
          `${endpoints.base}/${endpoints.operations.login.path}`,
          requestOptions,
        );
        const status = response.status;
        const loginDetails = await response.json();
        if (status === 200 && loginDetails) {
          await AsyncStorage.setItem('user', JSON.stringify(loginDetails));
          navigationProps.props.changeSignedInState(true, loginDetails);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('disabled');
    }
  }

  useEffect(() => {
    setIsDisabled(!(username !== '' && password !== ''));
  }, [username, password]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          style={styles.inputField}
          onChangeText={onChangeUsername}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={onChangePassword}
          style={styles.inputField}
          secureTextEntry={true}
        />
      </View>
      <View
        style={
          isDisabled ? styles.loginButtonDisabled : styles.loginButtonEnabled
        }>
        <Button color="#fff" title="Sign in" onPress={handleSignIn} />
      </View>
    </View>
  );
}

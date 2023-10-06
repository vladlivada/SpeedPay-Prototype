import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  inputField: {
    display: 'flex',
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  label: {
    marginTop: 20,
  },
  loginButtonEnabled: {
    backgroundColor: '#dd7373',
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#d1d1d1',
    borderRadius: 5,
    marginTop: 20,
  },
});

import {Alert} from 'react-native';

export const OpenPaymentAlert = (
  details: any,
  onDecline: Function,
  onAccept: Function,
) => {
  Alert.alert(
    `Payment to ${details.merchant.name}`,
    `Do you accept payment of ${details.amount} lei for ${details.description}?`,
    [
      {
        text: 'Decline',
        onPress: () => onDecline(),
        style: 'cancel',
      },
      {text: 'Accept', onPress: () => onAccept()},
    ],
  );
};

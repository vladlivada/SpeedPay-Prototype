import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Payments.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../utils/endpoints';

function PaymentsScreen(): JSX.Element {
  const [paymentsList, setPaymentsList] = useState([] as Array<any>);
  async function getUser() {
    return JSON.parse((await AsyncStorage.getItem('user')) as string);
  }

  useEffect(() => {
    const init = async () => {
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
      const transactionsRequest = await fetch(
        `${endpoints.base}/${endpoints.operations.driver.path}/${driver.id}/transactions`,
      );
      const fetchedPaymentsList = await transactionsRequest.json();
      setPaymentsList(
        fetchedPaymentsList.filter((payment: any) => payment.status !== 'OPEN'),
      );
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Previous payments: </Text>
      {paymentsList.length > 0 ? (
        <FlatList
          data={paymentsList}
          renderItem={({item}) => (
            <View style={styles.paymentContainer}>
              <Text>
                Merchant name:{' '}
                <Text style={{fontWeight: 'bold', marginTop: 8}}>{item.merchant.name}</Text>
              </Text>
              <Text>
                Payment no:{' '}
                <Text style={{fontWeight: 'bold', marginTop: 8}}>{item.orderId} </Text>
              </Text>
              <Text>
                Payment amount:{' '}
                <Text style={{fontWeight: 'bold', marginTop: 8}}>{item.amount} </Text>Lei
              </Text>
              <Text>
                Transaction details:{''}
                <Text style={{fontWeight: 'bold', marginTop: 8}}> {item.description} </Text>
              </Text>
              <Text>
                Status:{' '}
                <Text style={{fontWeight: 'bold', marginTop: 8}}>
                  {item.status}{' '}
                </Text>
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>No payments yet</Text>
      )}
    </View>
  );
}

export default PaymentsScreen;

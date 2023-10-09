import {CarPlay, InformationTemplate} from 'react-native-carplay';
import {Text} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {endpoints} from "../../utils/endpoints";
import {BaseEvent} from "react-native-carplay/lib/templates/Template";
import CarplayMode from "../../components/CarplayMode/CarplayMode";


export const PaymentsCarView = ({navigation}: any) => {


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

      const paymentsArray = fetchedPaymentsList.filter((payment: any) => payment.status !== 'OPEN').map((payment: any) => ({
        title: payment.merchant.name,
        detail: `Status: ${payment.status}, Amount: ${payment.amount}lei`
      }))
      const lastPayments = paymentsArray.slice(-5).reverse();

      const template = new InformationTemplate({
        title: 'Payments',
        items: lastPayments as any,
        actions: [],
        onActionButtonPressed(action) {

        },
        onWillDisappear(e: BaseEvent) {
          navigation.navigate('Menu')
        }
      });

      CarPlay.pushTemplate(template);
      return () => CarPlay.popToRootTemplate(true);
    };
    init();
  }, []);

  return (<CarplayMode/>)
}

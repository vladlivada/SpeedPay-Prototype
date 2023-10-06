import {endpoints} from '../utils/endpoints';
import {useEffect, useState} from 'react';

export const GetMerchants = () => {
  const [merchantLocations, setMerchantLocations] = useState([] as Array<any>);

  useEffect(() => {
    const fetchMerchants = async () => {
      const response = await fetch(
        `${endpoints.base}/${endpoints.operations.merchant.path}`,
      );
      const merchantsLocationsList = await response.json();
      setMerchantLocations(prev => {
        return [...prev, ...merchantsLocationsList];
      });
    };
    fetchMerchants();
  }, []);

  return merchantLocations;
};

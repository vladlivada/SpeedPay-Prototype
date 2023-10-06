import {Endpoints} from '../model/endpoints.model';

export const endpoints: Endpoints = {
  base: 'http://35.158.51.156',
  operations: {
    merchant: {
      path: 'api/merchant',
    },
    login: {
      path: 'login',
    },
    trigger: {
      path: 'api/merchant/trigger',
    },
    driver: {
      path: 'api/driver',
    },
    payment: {
      confirm: 'api/payment/confirm',
      decline: 'api/payment/decline'
    },
  },
};

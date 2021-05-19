import { AXIOS_INSTANCE } from "config/enviroment/enviroments";
import { API } from "constant/API";


export const productAPI = {
  getWallet: (key) => {
    return AXIOS_INSTANCE.post(API.GET_WALLET, { key });
  },
  createWallet: () => {
    return AXIOS_INSTANCE.post(API.CREATE_WALLET);
  }
};
import { HomeData } from './../types/home.types';
import api from "@/services/api/axios";

import {
  ENDPOINTS,
} from "@/services/api/endpoints";


export const getHome =
  async (): Promise<HomeData> => {

    const response =
      await api.get(
        ENDPOINTS.HOME
      );

    return response.data.data;

  };
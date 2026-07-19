import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";

import type {
  ContactFormData,
} from "../types/contact.types";


export const sendMessage = async (
  data: ContactFormData
) => {

  const response =
    await api.post(
      ENDPOINTS.CONTACT,
      data
    );


  return response.data.data;
};
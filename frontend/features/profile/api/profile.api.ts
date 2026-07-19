import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { Profile } from "../types/profile.types";

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get(ENDPOINTS.PROFILE);

  return response.data.data;
};
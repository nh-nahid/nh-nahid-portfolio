import api from "@/services/api/axios";

import { ENDPOINTS } from "@/services/api/endpoints";

import type { Experience } from "../types/experience.types";

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get(ENDPOINTS.EXPERIENCES);

  return response.data.data;
};
import api from "@/services/api/axios";

import { ENDPOINTS } from "@/services/api/endpoints";

import type { Skill } from "../types/skill.types";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get(ENDPOINTS.SKILLS);

  return response.data.data;
};
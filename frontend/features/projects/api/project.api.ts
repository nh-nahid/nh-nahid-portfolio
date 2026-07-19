// features/project/api/project.api.ts

import api from "@/services/api/axios";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Project } from "../types/project.types";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get(ENDPOINTS.PROJECTS);

  return response.data.data;
};
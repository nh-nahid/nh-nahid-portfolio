import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Project } from "@/features/projects/types/project.types";


interface ProjectState {
  data: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}


const initialState: ProjectState = {
  data: [],
  selectedProject: null,
  loading: false,
  error: null,
};


const projectSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {
    setProjects(
      state,
      action: PayloadAction<Project[]>
    ) {
      state.data = action.payload;
    },


    setSelectedProject(
      state,
      action: PayloadAction<Project | null>
    ) {
      state.selectedProject = action.payload;
    },


    setProjectLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },


    setProjectError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },


    clearProjects(state) {
      state.data = [];
      state.selectedProject = null;
    },
  },
});


export const {
  setProjects,
  setSelectedProject,
  setProjectLoading,
  setProjectError,
  clearProjects,
} = projectSlice.actions;


export default projectSlice.reducer;
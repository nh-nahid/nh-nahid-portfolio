import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Experience } from "@/features/experience/types/experience.types";


interface ExperienceState {
  data: Experience[];
  loading: boolean;
  error: string | null;
}


const initialState: ExperienceState = {
  data: [],
  loading: false,
  error: null,
};


const experienceSlice = createSlice({
  name: "experiences",
  initialState,

  reducers: {
    setExperiences(
      state,
      action: PayloadAction<Experience[]>
    ) {
      state.data = action.payload;
    },


    setExperienceLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },


    setExperienceError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },


    clearExperiences(state) {
      state.data = [];
    },
  },
});


export const {
  setExperiences,
  setExperienceLoading,
  setExperienceError,
  clearExperiences,
} = experienceSlice.actions;


export default experienceSlice.reducer;
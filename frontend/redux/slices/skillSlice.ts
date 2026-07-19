import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Skill } from "@/features/skills/types/skill.types";


interface SkillState {
  data: Skill[];
  loading: boolean;
  error: string | null;
}


const initialState: SkillState = {
  data: [],
  loading: false,
  error: null,
};


const skillSlice = createSlice({
  name: "skills",
  initialState,

  reducers: {
    setSkills(
      state,
      action: PayloadAction<Skill[]>
    ) {
      state.data = action.payload;
    },


    setSkillLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },


    setSkillError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },


    clearSkills(state) {
      state.data = [];
    },
  },
});


export const {
  setSkills,
  setSkillLoading,
  setSkillError,
  clearSkills,
} = skillSlice.actions;


export default skillSlice.reducer;
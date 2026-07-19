import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Profile } from "@/features/profile/types/profile.types";


interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}


const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};


const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {

    setProfile(
      state,
      action: PayloadAction<Profile>
    ) {
      state.data = action.payload;
    },


    setProfileLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },


    setProfileError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },


    clearProfile(state) {
      state.data = null;
    },

  },
});


export const {
  setProfile,
  setProfileLoading,
  setProfileError,
  clearProfile,
} = profileSlice.actions;


export default profileSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  submitting: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,

  reducers: {

    setContactSubmitting(
      state,
      action: PayloadAction<boolean>
    ) {
      state.submitting = action.payload;
    },


    setContactSuccess(
      state,
      action: PayloadAction<boolean>
    ) {
      state.success = action.payload;
    },


    setContactError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },


    resetContact(state) {
      state.submitting = false;
      state.success = false;
      state.error = null;
    },

  },
});


export const {
  setContactSubmitting,
  setContactSuccess,
  setContactError,
  resetContact,
} = contactSlice.actions;


export default contactSlice.reducer;
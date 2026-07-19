import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./slices/profileSlice";
import skillReducer from "./slices/skillSlice";
import experienceReducer from "./slices/experienceSlice";
import projectReducer from "./slices/projectSlice";
import contactReducer from "./slices/contactSlice";


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    skills: skillReducer,
    experiences: experienceReducer,
    projects: projectReducer,
    contact: contactReducer,
  },
});


export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;
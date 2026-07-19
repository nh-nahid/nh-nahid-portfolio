"use client";

import {
  useEffect,
} from "react";


import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";


import {
  setProfile,
  setProfileLoading,
  setProfileError,
} from "@/redux/slices/profileSlice";


import {
  getProfile,
} from "../api/profile.api";



export const useProfile = () => {

  const dispatch =
    useAppDispatch();


  const profile =
    useAppSelector(
      (state) => state.profile
    );


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        dispatch(
          setProfileLoading(true)
        );


        const data =
          await getProfile();


        dispatch(
          setProfile(data)
        );


      } catch(error) {

        dispatch(
          setProfileError(
            "Failed to load profile"
          )
        );


      } finally {

        dispatch(
          setProfileLoading(false)
        );

      }

    };


    fetchProfile();


  }, [dispatch]);


  return profile;
};
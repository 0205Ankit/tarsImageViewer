import { useDispatch } from "react-redux";
import supabase from "../config/supabaseClient";
import { currentUserActions, userActions } from "../store/store";
import { useEffect } from "react";

export default function useSetUsers() {
  const dispatch = useDispatch();

  const asyncFunction = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        /// getting all user with authid
        const { data: info, error } = await supabase
          .from("User")
          .select("authId");

        // checking if the user already exist if exist then set currentData of user and userData(auth), if not exist then create a new user with authId of userData id
        const existUser = info.filter((item) => item.authId === data.user.id);

        if (!existUser.length > 0) {
          const { data: addData } = await supabase
            .from("User")
            .insert({ authId: data.user.id })
            .select();
          dispatch(currentUserActions.setcurrData(addData));
          return;
        }

        const { data: oneUser } = await supabase
          .from("User")
          .select()
          .eq("authId", data.user.id)
          .single();

        dispatch(currentUserActions.setcurrData(oneUser));
        dispatch(userActions.setUserData(data.user));
        return;
      }
      dispatch(userActions.setUserData({}));
    } catch (err) {
      console.log(err);
      dispatch(userActions.setUserData({}));
    }
  };

  useEffect(() => {
    asyncFunction();
  });
}

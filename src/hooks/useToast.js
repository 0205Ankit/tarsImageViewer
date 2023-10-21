import { useCallback } from "react";
import {
  toastSliceActions,
} from "../store/store";
import { useDispatch, useSelector } from "react-redux";


export const useToast = () => {
  const { showToast, ...data } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const toast = useCallback(
    (data) => {
      dispatch(toastSliceActions.hideToast());
      setTimeout(() => {
        dispatch(toastSliceActions.showToast(data));
      }, 100);
    },
    [dispatch]
  );

  const hideToast = useCallback(() => {
    dispatch(toastSliceActions.hideToast());
  }, [dispatch]);

  return {
    isToastVisible: showToast,
    toast,
    hideToast,
    data,
  };
};

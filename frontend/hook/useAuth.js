import { useDispatch, useSelector } from "react-redux";

import { setAuth, clearAuth as clearAuthAction } from "../redux/authSlice.js";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setauth = (authData) => dispatch(setAuth(authData));
  const clearauth = () => dispatch(clearAuthAction());
  return { auth, setauth, clearauth };
};

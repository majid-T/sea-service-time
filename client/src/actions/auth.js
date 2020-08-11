import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Loading user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const res = await axios.get(
      `http://35.225.87.109:5000/api/auth/?token=${localStorage.token}`,
      config
    );

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("Majid", err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Registering a user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = JSON.stringify({ name, email, password, role: "seafarer" });

  try {
    const res = await axios.post(
      "http://35.225.87.109:5000/api/users",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    } else {
      dispatch(setAlert("Something went wrong", "danger", 10000));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login a user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://35.225.87.109:5000/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    } else {
      dispatch(setAlert("Something went wrong", "danger", 10000));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

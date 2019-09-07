
import { AUTH_USER, AUTH_ERROR } from "./types";
import { CLEAR_USER } from "../dbActions/types";

import axios from "axios";

export const signup = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/api/auth/signup", formProps);
        let { userData } = res.data;

        dispatch({ type: AUTH_USER, payload: res.data.token });
        localStorage.setItem("token", res.data.token);

        callback(userData);
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
}

export const signin = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("api/auth/signin", formProps);
        let { userData } = res.data;

        console.log(res.data.token)
        console.log(res.data)

        dispatch({ type: AUTH_USER, payload: res.data.token });
        localStorage.setItem("token", res.data.token);

        callback(userData);
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    }
}

export const signout = () => async dispatch => {
    console.log("User logged out")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    dispatch({
        type: AUTH_USER,
        payload: ""
    })
    dispatch({
        type: CLEAR_USER,
        payload: ""
    })
}


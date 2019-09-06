
import { LOAD_USER, RECEIVED_MESSAGE, CREATE_CHANNEL, LOAD_DASHBOARD } from "../../actions/dbActions/types";


export const loadUser = (data, callback) => async dispatch => {
  console.log("We're inside dbActions")
  console.log(data)
  localStorage.setItem("userId", data.id);
  try {
      dispatch({ type: LOAD_USER, payload: data });
      callback();
  } catch (e) {
      dispatch({ type: LOAD_USER, payload: "Error: retriving user info" });
  }
}

export const loadDashboard = (data) => async dispatch => {
  console.log("We're inside dbActions")
  console.log(data)
  try {
      dispatch({ type: LOAD_DASHBOARD, payload: data });
  } catch (e) {
      dispatch({ type: LOAD_DASHBOARD, payload: "Error: saving new message to store" });
  }
}

export const receivedMessage = (data) => async dispatch => {
  console.log("We're inside dbActions")
  console.log(data)
  try {
      dispatch({ type: RECEIVED_MESSAGE, payload: data });
  } catch (e) {
      dispatch({ type: RECEIVED_MESSAGE, payload: "Error: saving new message to store" });
  }
}

export const createChannel = (data) => async dispatch => {
  console.log("We're inside createChannel")
  console.log(data)
  let { Users, Channels } = data
  try {
      dispatch({ type: CREATE_CHANNEL, payload: Channels });
      dispatch({ type: LOAD_USER, payload: Users });
  } catch (e) {
      dispatch({ type: CREATE_CHANNEL, payload: "Error: saving new channel to store" });
  }
}

// socket middleware is saved to state in createStore, which also creates connection
// component initiates action via event handlers
// data is captured via reduxForms and calls an action
// action dispatches payload to reducer
// reducer updates state, passing through socket middleware
// socket listens to message type and calls action


// App.js connects to socket 


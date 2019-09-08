  import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./authReducer";
import db from "./dbReducer";
import api from "./apiReducer";

export default combineReducers({
    auth,
    db,
    api,
    form: formReducer
})
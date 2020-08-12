import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import seaBlock from "./seaBlock";

export default combineReducers({ alert, auth, seaBlock });

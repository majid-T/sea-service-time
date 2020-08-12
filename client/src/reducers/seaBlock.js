import {
  SERVICE_QUERY,
  CONTRACT_ERROR,
  LOGOUT,
  CLEAR_SERVICE_RECORD,
} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SERVICE_QUERY:
      return {
        ...state,
        record: payload,
      };
    case LOGOUT:
    case CLEAR_SERVICE_RECORD:
      // case CONTRACT_ERROR:
      return {
        ...state,
        record: { b: "b" },
      };
    default:
      return state;
  }
}

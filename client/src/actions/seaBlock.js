import axios from "axios";
import { SERVICE_QUERY, CONTRACT_ERROR, CLEAR_SERVICE_RECORD } from "./types";
import { setAlert } from "./alert";

//Get service record
export const getServiceRecord = (recordId) => async (dispatch) => {
  console.log("RECORD ID", recordId);
  dispatch({
    type: CLEAR_SERVICE_RECORD,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const res = await axios.get(
      `http://35.225.87.109:5000/api/contract/query-service/${recordId}`,
      config
    );

    dispatch({
      type: SERVICE_QUERY,
      payload: res.data,
    });
  } catch (err) {
    console.log("Majid", err);
    dispatch({
      type: CONTRACT_ERROR,
    });
  }
};

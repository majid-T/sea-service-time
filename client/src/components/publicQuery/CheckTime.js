import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import SeaRecordCard from "../dashboard/seafarer/SeaRecordCard";

const CheckTime = ({ setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
  const [recordId, setRecordId] = useState("");

  //user record query
  const getServiceRecord = async () => {
    if (recordId.length === 0) {
      setAlert("Please type in user record id first", "danger");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      setLoading(true);
      const res = await axios.get(
        `http://35.225.87.109:5000/api/contract/query-service/${recordId}`,
        config
      );

      console.log(res.data);
      setUserRecord(res.data);
      setAlert(`Record Found for ${res.data.name}`, "success");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAlert(`Something went wrong ${err}`, "danger");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="large text-primary">Query Seafarer</h1>
      <p className="lead bottom-line">
        <i className="fas fa-address-book"></i> Enter Candidate record id
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="form w50 p-2 m-2">
            <input
              type="text"
              placeholder="Candidate record id"
              name="recordId"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              required
            />

            <button className="btn btn-primary" onClick={getServiceRecord}>
              <i className="fas fa-search"></i> Find Record
            </button>
          </div>
          {userRecord && <SeaRecordCard userRecord={userRecord} />}
        </>
      )}
    </>
  );
};

CheckTime.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(CheckTime);

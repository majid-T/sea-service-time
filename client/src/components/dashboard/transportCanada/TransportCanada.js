import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import SeaRecordCard from "../seafarer/SeaRecordCard";

const TransportCanada = ({ auth: { user, token }, setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
  const [recordId, setRecordId] = useState("");
  const [rank, setRank] = useState("");

  //user record query
  const getServiceRecord = async (_id) => {
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

  // Promote User
  const promoteUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `http://35.225.87.109:5000/api/contract/promote/${recordId}/?token=${token}`,
        { rank },
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

  // Retire User
  const retireUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `http://35.225.87.109:5000/api/contract/retire/${recordId}/?token=${token}`,
        config
      );

      setUserRecord(res.data);
      setAlert(`User ${res.data.name} retired successfuly`, "success");
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
      <p className="lead">
        <i className="fas fa-address-book"></i> Enter Candidate record id
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="form-group">
            <input
              type="text"
              placeholder="Candidate record id"
              name="recordId"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={getServiceRecord}>
            <i className="fas fa-search"></i> Find Record
          </button>
          <hr />
          {userRecord && (
            <>
              <select
                name="rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              >
                <option value="Master Mariner">Master Mariner</option>
                <option value="Chief Mate">Chief Mate</option>
                <option value="Watchkeeping Mate">Watchkeeping Mate</option>
              </select>
              <button className="btn btn-primary" onClick={promoteUser}>
                <i className="fas fa-award"></i> Promote
              </button>
              <button className="btn btn-primary" onClick={retireUser}>
                <i className="fas fa-hot-tub"></i> Retire
              </button>
            </>
          )}
          <hr />
          {userRecord && <SeaRecordCard userRecord={userRecord} />}
        </>
      )}
    </>
  );
};

TransportCanada.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(TransportCanada);

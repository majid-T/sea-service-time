import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import CreateRecord from "./CreateRecord";
import SeaRecordCard from "./SeaRecordCard";

const SeafarerDash = ({ auth: { user, token }, setAlert }) => {
  const [userRecord, setUserRecord] = useState({});
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(false);

  //user record query
  const getServiceRecord = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await axios.get(
        `http://35.225.87.109:5000/api/contract/query-service/${_id}`,
        config
      );

      setUserRecord(res.data);
    } catch (err) {
      console.log(err);
      setAlert(`Something went wrong ${err}`, "danger");
    }
  };

  useEffect(() => {
    setRecordId(user.recordId);
    if (user.recordId) {
      getServiceRecord(user.recordId);
    }
  }, []);

  const register = async (dateOfBirth, cdn) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Types": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `http://35.225.87.109:5000/api/contract/createRecord/?token=${token}`,
        { name: user.name, dateOfBirth, cdn },
        config
      );
      setUserRecord(res.data);
      setRecordId(res.data.recordId);
      console.log(res.data);

      setAlert("Record Created", "success");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAlert("Something went wrong", "danger");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Seafarer</h1>
      <hr></hr>
      {recordId ? (
        <SeaRecordCard userRecord={userRecord} />
      ) : (
        <CreateRecord action={register} loading={loading} />
      )}
    </div>
  );
};

SeafarerDash.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(SeafarerDash);

import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";

const MasterCapt = ({ auth: { user, token }, setAlert }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recordId: "",
    vesselOwner: "",
    vesselNo: "",
    dateSignIn: "",
    dateSignOff: "",
    time: "",
  });

  const {
    recordId,
    vesselOwner,
    vesselNo,
    dateSignIn,
    dateSignOff,
    time,
  } = formData;

  //user record query
  const addServiceTime = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const body = {
      vesselOwner,
      vesselNo,
      dateSignIn,
      dateSignOff,
      time,
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `http://35.225.87.109:5000/api/contract/add-service-time/${recordId}/?token=${token}`,
        body,
        config
      );

      if (res.status == 200) {
        setAlert(`Sea time service added for ${res.data.name}`, "success");
        setFormData({
          recordId: "",
          vesselOwner: "",
          vesselNo: "",
          dateSignIn: "",
          dateSignOff: "",
          time: "",
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setAlert(`Something went wrong `, "danger");
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addServiceTime();
  };

  useEffect(() => {}, []);

  return (
    <>
      <p className="lead bottom-line">
        <i className="fas fa-calendar-plus"></i> Add sea service time for your
        crew
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <form className="form shadow1 w50 p-1" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Vessel Owner name"
              name="vesselOwner"
              value={vesselOwner}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Name of the vessel owner on voyage
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Vessel Regisration No"
              name="vesselNo"
              value={vesselNo}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Vessel registration number</small>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Sea time service in days"
              name="time"
              value={time}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">This value should be in days </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Seafarer record Id"
              name="recordId"
              value={recordId}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              This value is different from seafarer CDN
            </small>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dateSignIn"
              value={dateSignIn}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Date seafarer signed in onboard</small>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dateSignOff"
              value={dateSignOff}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Date seafarer signed off the vessel
            </small>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      )}
    </>
  );
};

MasterCapt.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(MasterCapt);

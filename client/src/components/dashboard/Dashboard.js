import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Dashboard = ({ auth: { user } }) => {
  useEffect(() => {}, []);
  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateTpProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateTpProps, {})(Dashboard);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SeafarerDash from "./SeafarerDash";
import MasterCapt from "./MasterCapt";
import TransportCanada from "./TransportCanada";
import Spinner from "../layout/Spinner";

const Dashboard = ({ auth: { user, loading } }) => {
  useEffect(() => {}, []);
  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            {" "}
            <i className="fas fa-user">Welcome {user && user.name}</i>
          </p>

          {user.role === "seafarer" && <SeafarerDash user={user} />}
          {user.role === "master/capt" && <MasterCapt user={user} />}
          {user.role === "tc-canada" && <TransportCanada user={user} />}
        </>
      )}
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

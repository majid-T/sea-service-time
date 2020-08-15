import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SeafarerDash from "./seafarer/SeafarerDash";
import MasterCapt from "./masterCaptain/MasterCapt";
import TransportCanada from "./transportCanada/TransportCanada";
import Spinner from "../layout/Spinner";

const Dashboard = ({ auth: { user, loading } }) => {
  useEffect(() => {}, []);
  return (
    <>
      {loading || !user ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <p className="lead">
            <span className="large text-primary">
              {user.role === "seafarer" && <i className="fas fa-hard-hat"></i>}
              {user.role === "master/capt" && (
                <i className="fas fa-user-tie"></i>
              )}
              {user.role === "tc-canada" && (
                <i className="fab fa-canadian-maple-leaf"></i>
              )}{" "}
              Welcome {user && user.name}
            </span>
          </p>
          {user.role === "seafarer" && <SeafarerDash />}
          {user.role === "master/capt" && <MasterCapt />}
          {user.role === "tc-canada" && <TransportCanada />}
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

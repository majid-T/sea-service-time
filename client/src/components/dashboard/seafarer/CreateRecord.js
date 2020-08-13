import React, { useState } from "react";
import Spinner from "../../layout/Spinner";

const CreateRecord = ({ action, loading }) => {
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [cdn, setCdn] = useState("");

  return (
    <div className="form w50 p-2 m-2">
      <input
        type="text"
        placeholder="* Candidate Number, CDN"
        name="cdn"
        value={cdn}
        onChange={(e) => setCdn(e.target.value)}
        required
      />
      <small className="form-text">
        Your CDN which you have received from Transport Canada
      </small>

      <input
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={(e) => setdateOfBirth(e.target.value)}
      />
      <small className="form-text">Your date of birth</small>

      {loading ? (
        <Spinner />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => action(dateOfBirth, cdn)}
        >
          <i className="fas fa-user-plus"></i> Register
        </button>
      )}
    </div>
  );
};

export default CreateRecord;

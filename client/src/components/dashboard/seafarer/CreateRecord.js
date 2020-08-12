import React, { useState } from "react";
import Spinner from "../../layout/Spinner";

const CreateRecord = ({ action, loading }) => {
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [cdn, setCdn] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="* Candidate Number, CDN"
        name="cdn"
        value={cdn}
        onChange={(e) => setCdn(e.target.value)}
        required
      />
      <input
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={(e) => setdateOfBirth(e.target.value)}
      />
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
    </>
  );
};

export default CreateRecord;

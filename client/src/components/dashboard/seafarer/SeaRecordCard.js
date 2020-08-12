import React from "react";

const SeaRecordCard = ({ userRecord }) => {
  return (
    <>
      <h1>New Show record</h1>
      <p>{userRecord.name}</p>
      <p>{userRecord.cdn}</p>
      <p>{userRecord.dateOfBirth}</p>
      <p>{userRecord.dateOfBirth}</p>
      <p>{userRecord.rank}</p>
      <p>{userRecord.recordId}</p>
      <p>{userRecord.seaTime}</p>
      <p>{userRecord.status}</p>
    </>
  );
};

export default SeaRecordCard;

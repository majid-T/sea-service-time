import React from "react";

const SeaRecordCard = ({ userRecord }) => {
  return (
    <>
      {userRecord && (
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
          <h3>Records are:</h3>
          <hr />
          {userRecord.serviceTimes &&
            userRecord.serviceTimes.map((res, index) => (
              <div key={index}>
                <span>{res.time} | </span>
                <span>{res.dateSignIn} | </span>
                <span>{res.dateSignOff} | </span>
                <span>{res.vesselNo} | </span>
                <span>{res.vesselOwner} | </span>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default SeaRecordCard;

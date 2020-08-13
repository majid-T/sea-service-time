import React from "react";
import Moment from "react-moment";

const SeaRecordCard = ({ userRecord }) => {
  const seaRecords = userRecord.serviceTimes.map((res, index) => {
    return (
      <tr key={index}>
        <td className="hide-sm">{index}</td>
        <td>{res.vesselNo}</td>
        <td>{res.vesselOwner}</td>
        <td>
          <Moment format="YYYY/MM/DD">{res.dateSignIn}</Moment> -
          <Moment format="YYYY/MM/DD">{res.dateSignOff}</Moment>
        </td>
        <td>{res.time}</td>
      </tr>
    );
  });
  return (
    <>
      {userRecord && (
        <div className="recordCard shadow1 m p  ">
          <span className="badge">
            {userRecord.name} - {userRecord.status}
          </span>
          <div className="row">
            <div className="column">
              <p>
                <i className="fas fa-user-tag"></i> Record Id:{" "}
                {userRecord.recordId}
              </p>
              <p>
                <i className="far fa-id-badge"></i> CDN: {userRecord.cdn}
              </p>
            </div>
            <div className="column">
              <p>
                <i className="fas fa-birthday-cake"></i> Date of Birth:{" "}
                {userRecord.dateOfBirth}
              </p>
              <p>
                <i className="fas fa-tag"></i> Rank: {userRecord.rank}
              </p>
            </div>
          </div>
          <p></p>
          <h3>
            <i className="fas fa-calendar-day"></i> Total Sea time:{" "}
            {userRecord.seaTime} | Sea Records are:
          </h3>
          {userRecord.serviceTimes && (
            <table className="table">
              <thead>
                <tr>
                  <th className="hide-sm">#</th>
                  <th>Vessel Reg no</th>
                  <th>Vessel Owner</th>
                  <th>From-To</th>
                  <th>Time in days</th>
                </tr>
              </thead>
              <tbody>{seaRecords}</tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default SeaRecordCard;

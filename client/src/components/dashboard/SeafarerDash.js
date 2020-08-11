import React from "react";

const SeafarerDash = ({ user: { name } }) => {
  return (
    <div>
      <h1>Seafarer</h1>
      {name}
    </div>
  );
};

export default SeafarerDash;

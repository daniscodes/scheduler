import React from "react";

// Component function //
export default function Empty(props) {

// Empty component //  
  return (
    <main className="appointment__add">
      <img
        src="images/add.png"
        alt="Add"
        className="appointment__add-button" onClick={props.onAdd}
      />
    </main>
  );
}
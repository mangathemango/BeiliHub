// import React from "react";

export const Progress = ({ value = 0 }: { value?: number }) => (
  <div style={{ border: "1px solid black", width: "100%" }}>
    <div style={{ background: "black", height: "8px", width: `${value}%` }} />
  </div>
);

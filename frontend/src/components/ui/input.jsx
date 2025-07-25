import React from "react";

export const Input = ({ className = "", ...props }) => (
  <input
    className={className}
    style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
    {...props}
  />
);

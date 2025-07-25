import React from "react";

export const Button = ({ children, ...props }) => (
  <button
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
    {...props}
  >
    {children}
  </button>
);

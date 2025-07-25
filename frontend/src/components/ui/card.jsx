import React from "react";

export const Card = ({ children, className = "" }) => (
  <div style={{
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "1rem"
  }} className={className}>
    {children}
  </div>
);

export const CardContent = ({ children }) => <div>{children}</div>;

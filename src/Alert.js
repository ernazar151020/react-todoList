import React, { useEffect } from "react";

const Alert = ({ msg, type, showAlert, list }) => {
  useEffect(() => {
    setTimeout(() => showAlert(), 3000);
    return function () {
      clearTimeout(() => showAlert());
    };
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;

import React from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";
import errorPage from "../../assets/404 Error.png";

import { MDBBtn } from "mdb-react-ui-kit";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Error-Page-Main">
      <div className="m-2">
        <MDBBtn
          className="btn-rounded heroSecBtn-2"
          style={{
            width: "100%",
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </MDBBtn>
      </div>
      <div className="m-2">
        <img className="error-image" src={errorPage} />
      </div>
    </div>
  );
};
export default ErrorPage;

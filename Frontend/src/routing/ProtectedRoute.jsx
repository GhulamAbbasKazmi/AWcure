import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./ProtectedRoute.css";

import errorImage from "../assets/401 Error.png";

import { MDBBtn } from "mdb-react-ui-kit";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="Protected-Route-Main">
        <div className="m-2">
          <MDBBtn
            className="btn-rounded heroSecBtn-2"
            style={{
              width: "100%",
            }}
            onClick={() => navigate("/login")}
          >
            Login to gain access
          </MDBBtn>
        </div>
        <div className="m-2">
          <img className="error-image" src={errorImage} />
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      bgColor="primary"
      className="text-white text-center text-lg-left"
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Disclaimer</h5>

            <p>
              The information on this website is for general informational
              purposes only and is not intended to be a substitute for
              professional medical advice, diagnosis, or treatment. Always seek
              the advice of your physician or other qualified healthcare
              provider with any questions you may have regarding a medical
              condition
            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="facebook-f" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="twitter" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#dd4b39" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="google" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#ac2bac" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="instagram" />
                </MDBBtn>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-2" />
              Wah Cantt, COMSATS, Pakistan
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              awcure@gmail.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
            </p>
            <p>
              <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white">awcure.com All rights reserved.</a>
      </div>
    </MDBFooter>
  );
}

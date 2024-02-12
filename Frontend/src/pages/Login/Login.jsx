import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  requestResetPasswordLink,
  resetPassword,
} from "../../features/user/userActions";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";
import useWindowSize from "../../utils/useWindowSize";
import logoDark from "../../assets/logo-dark.png";
import logo from "../../assets/logo.png";

import femaleDoc from "../../assets/3d-female-doctor-at-desk.png";

function Login({ darkMode }) {
  const {
    loading,
    userInfo,
    login_error,
    reset_password_link_error,
    reset_password_link_success,
    reset_password_error,
    reset_password_success,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, token } = useParams();

  const [resetLinkSent, setResetLinkSent] = useState(false);

  const [basicModal, setBasicModal] = useState(false);

  const [userID, setUserID] = useState(undefined);
  const [resetToken, setResetToken] = useState(undefined);

  const toggleShow = () => {
    if (reset_password_success) {
      navigate("/login");
    }
    setBasicModal(!basicModal);
  };

  const { width, height } = useWindowSize();
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const [emailError, setEmailError] = useState("");
  const [emailErrorForgetPassword, setEmailErrorForgetPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorForgetPassword, setPasswordErrorForgetPassword] =
    useState("");

  const [
    confirmPasswordErrorForgetPassword,
    setConfirmPasswordErrorForgetPassword,
  ] = useState("");
  const [confirmPasswordForgetPassword, setConfirmPasswordForgetPassword] =
    useState("");

  const [email, setEmail] = useState("");
  const [emailForgetPassword, setEmailForgetPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordForgetPassword, setPasswordForgetPassword] = useState("");

  useEffect(() => {
    if (email == "") {
      setEmailError("");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (emailForgetPassword == "") {
      setEmailErrorForgetPassword("");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailForgetPassword)
    ) {
      setEmailErrorForgetPassword("Invalid email address");
    } else {
      setEmailErrorForgetPassword("");
    }
  }, [emailForgetPassword]);

  useEffect(() => {
    if (password == "") {
      setPasswordError("");
    } else if (password.length < 5) {
      setPasswordError("Password should be atleast of 5 characters");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    if (passwordForgetPassword == "") {
      setPasswordErrorForgetPassword("");
    } else if (passwordForgetPassword.length < 5) {
      setPasswordErrorForgetPassword(
        "Password should be atleast of 5 characters"
      );
    } else {
      setPasswordErrorForgetPassword("");
    }
  }, [passwordForgetPassword]);

  useEffect(() => {
    if (confirmPasswordForgetPassword == "") {
      setConfirmPasswordErrorForgetPassword("");
    } else if (passwordForgetPassword != confirmPasswordForgetPassword) {
      setConfirmPasswordErrorForgetPassword("Password mismatch");
    } else {
      setConfirmPasswordErrorForgetPassword("");
    }
  }, [confirmPasswordForgetPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email == "") {
      setEmailError("Email is empty");
    }
    if (password == "") {
      setPasswordError("Password is empty");
    }

    if (
      emailError == "" &&
      passwordError == "" &&
      email != "" &&
      password != ""
    ) {
      console.log("login User!");
      dispatch(userLogin({ email, password }));
    } else {
      console.log("Error!");
    }
  };

  useEffect(() => {
    if (userId && token) {
      setUserID(userId);
      setResetToken(token);
      setResetLinkSent(true);
      setTimeout(() => setBasicModal(true), 1000);
    }
  }, [userId]);

  const resetPasswordHandler = () => {
    if (userID && resetToken && resetLinkSent) {
      if (passwordForgetPassword == "") {
        setPasswordErrorForgetPassword("Password is empty");
      }

      if (confirmPasswordForgetPassword == "") {
        setConfirmPasswordErrorForgetPassword("Confirm Password is empty");
      }

      if (
        passwordForgetPassword != "" &&
        confirmPasswordForgetPassword != "" &&
        passwordErrorForgetPassword == "" &&
        confirmPasswordErrorForgetPassword == ""
      ) {
        dispatch(
          resetPassword({
            password: passwordForgetPassword,
            userId: userID,
            token: resetToken,
          })
        );
        setResetLinkSent(true);
      }
    } else {
      if (emailForgetPassword == "") {
        setEmailErrorForgetPassword("Email is empty");
      }

      if (emailForgetPassword != "" && emailErrorForgetPassword == "") {
        dispatch(requestResetPasswordLink({ email: emailForgetPassword }));
        setResetLinkSent(true);
      }
    }

    console.log("resetPasswordHandler!");
  };

  const resendResetLinkHandler = () => {
    if (emailForgetPassword != "" && emailErrorForgetPassword == "") {
      dispatch(requestResetPasswordLink({ email: emailForgetPassword }));
      setResetLinkSent(true);

      toast.success(`Reset Link Sent to ${emailForgetPassword}`, {
        closeButton: false,
      });
    }
  };
  return (
    <div className="Login-main">
      <ToastContainer />
      <MDBModal
        animationDirection="right"
        show={basicModal}
        setShow={setBasicModal}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {userID &&
                resetToken &&
                resetLinkSent &&
                reset_password_success == false ? (
                  <>
                    Set New Password
                    <MDBIcon fas icon="key" color="success" className="mx-2" />
                  </>
                ) : reset_password_success ? (
                  <>
                    Password Reset Success{" "}
                    <MDBIcon
                      far
                      icon="check-circle"
                      color="success"
                      className="mx-2"
                    />
                  </>
                ) : resetLinkSent == false ||
                  reset_password_link_error != null ||
                  reset_password_link_success == false ? (
                  <>
                    Forgot Password{" "}
                    <MDBIcon
                      fas
                      icon="lock-open"
                      color="success"
                      className="mx-2"
                    />
                  </>
                ) : resetLinkSent == true && reset_password_link_success ? (
                  <>
                    Check your Email
                    <MDBIcon
                      fas
                      icon="envelope"
                      color="primary"
                      className="mx-2"
                    />
                  </>
                ) : null}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>

            {loading ? (
              <MDBRow className="d-flex justify-content-center align-items-center my-3">
                <MDBSpinner color="primary">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              </MDBRow>
            ) : (
              <>
                <MDBModalBody>
                  {userID &&
                  resetToken &&
                  resetLinkSent &&
                  reset_password_success == false ? (
                    <>
                      Please enter your new password!
                      <div className="Login-form-field-text-message mt-3">
                        {passwordErrorForgetPassword == "" ? (
                          <div
                            className={`Login-form-field-text ${
                              darkMode ? "text-light" : "text-dark"
                            }`}
                          >
                            Password{" "}
                            {passwordForgetPassword != "" ? (
                              <i className="fas fa-check-double text-success"></i>
                            ) : null}
                          </div>
                        ) : (
                          <div className="Login-form-field-error-meesage">
                            {passwordErrorForgetPassword}
                          </div>
                        )}
                      </div>
                      <MDBInput
                        className="mb-4 mt-2"
                        type="password"
                        label="New Password"
                        contrast={!darkMode ? false : true}
                        value={passwordForgetPassword}
                        onChange={(e) =>
                          setPasswordForgetPassword(e.target.value)
                        }
                      />
                      <div className="Login-form-field-text-message mt-3">
                        {confirmPasswordErrorForgetPassword == "" ? (
                          <div
                            className={`Login-form-field-text ${
                              darkMode ? "text-light" : "text-dark"
                            }`}
                          >
                            Confirm Password{" "}
                            {confirmPasswordForgetPassword != "" ? (
                              <i className="fas fa-check-double text-success"></i>
                            ) : null}
                          </div>
                        ) : (
                          <div className="Login-form-field-error-meesage">
                            {confirmPasswordErrorForgetPassword}
                          </div>
                        )}
                      </div>
                      <MDBInput
                        className="mb-4 mt-2"
                        type="password"
                        label="Confirm New Password"
                        contrast={!darkMode ? false : true}
                        value={confirmPasswordForgetPassword}
                        onChange={(e) =>
                          setConfirmPasswordForgetPassword(e.target.value)
                        }
                      />
                      {reset_password_error ? (
                        <>
                          <div className="text-danger text-center my-2">
                            {reset_password_error}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                          </div>
                          <div
                            onClick={() => {
                              setResetLinkSent(false);
                              setUserID(undefined);
                              setResetToken(undefined);
                            }}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Try again{" "}
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : reset_password_success ? (
                    <>
                      {reset_password_success.success}
                      <MDBIcon
                        fas
                        icon="check-double"
                        size="2x"
                        className="mx-2"
                        color="success"
                      />
                    </>
                  ) : resetLinkSent == false ||
                    reset_password_link_error != null ? (
                    <>
                      No worries! we'll send you reset instructions.
                      <div className="Login-form-field-text-message mt-3">
                        {emailErrorForgetPassword == "" ? (
                          <div
                            className={`Login-form-field-text ${
                              darkMode ? "text-light" : "text-dark"
                            }`}
                          >
                            Email{" "}
                            {emailForgetPassword != "" ? (
                              <i className="fas fa-check-double text-success"></i>
                            ) : null}
                          </div>
                        ) : (
                          <div className="Login-form-field-error-meesage">
                            {emailErrorForgetPassword}
                          </div>
                        )}
                      </div>
                      <MDBInput
                        className="mb-4 mt-2"
                        type="email"
                        id="form2Example1"
                        label="Email address"
                        contrast={!darkMode ? false : true}
                        value={emailForgetPassword}
                        onChange={(e) => setEmailForgetPassword(e.target.value)}
                      />
                      {reset_password_link_error ? (
                        <div className="text-danger text-center my-2">
                          {reset_password_link_error}{" "}
                          <i className="fas fa-exclamation-triangle text-danger"></i>
                        </div>
                      ) : null}
                    </>
                  ) : resetLinkSent == true && reset_password_link_success ? (
                    <>
                      <div className="mt-2 text-center">
                        {reset_password_link_success.success}
                        <br />
                        <strong>{emailForgetPassword}</strong>
                      </div>

                      <div className="mt-3 text-center text-muted">
                        Didn't receive the email?{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={resendResetLinkHandler}
                        >
                          resend
                        </span>
                      </div>
                    </>
                  ) : null}
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Back to Login
                  </MDBBtn>

                  {(resetLinkSent == false ||
                    reset_password_link_error != null ||
                    reset_password_link_success == false ||
                    userID) &&
                  reset_password_success == false ? (
                    <MDBBtn onClick={resetPasswordHandler}>
                      Reset Password
                    </MDBBtn>
                  ) : resetLinkSent == true && reset_password_link_success ? (
                    <MDBBtn
                      onClick={() => window.open("mailto:email@example.com")}
                    >
                      Open Email App
                    </MDBBtn>
                  ) : null}
                </MDBModalFooter>
              </>
            )}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {width >= 835 ? (
        <div className="logo-image-section">
          <img src={femaleDoc} className="Login-illustration" />
        </div>
      ) : null}

      <form
        className={`${darkMode ? "loginForm-dark" : "loginForm"}`}
        onSubmit={handleSubmit}
      >
        <div className="Login-form-field-text-message">
          {emailError == "" ? (
            <div
              className={`Login-form-field-text ${
                darkMode ? "text-light" : "text-dark"
              }`}
            >
              Email{" "}
              {email != "" ? (
                <i className="fas fa-check-double text-success"></i>
              ) : null}
            </div>
          ) : (
            <div className="Login-form-field-error-meesage">{emailError}</div>
          )}
        </div>

        <MDBInput
          className="mb-4 mt-2"
          type="email"
          id="form2Example1"
          label="Email address"
          contrast={!darkMode ? false : true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="Login-form-field-text-message">
          {passwordError == "" ? (
            <div
              className={`Login-form-field-text ${
                darkMode ? "text-light" : "text-dark"
              }`}
            >
              Password{" "}
              {password != "" ? (
                <i className="fas fa-check-double text-success"></i>
              ) : null}
            </div>
          ) : (
            <div className="Login-form-field-error-meesage">
              {passwordError}
            </div>
          )}
        </div>

        <MDBInput
          className="mb-4 mt-2"
          type="password"
          id="form2Example2"
          label="Password"
          contrast={!darkMode ? false : true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-between forget-remember-btns">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
            className="mb-2"
          />
          <p
            className="mb-2"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={toggleShow}
          >
            Forgot password?
          </p>
        </div>

        <MDBRow>
          {login_error ? (
            <div className="text-danger text-center mb-2">
              {login_error}{" "}
              <i className="fas fa-exclamation-triangle text-danger"></i>
            </div>
          ) : loading &&
            emailForgetPassword == "" &&
            passwordForgetPassword == "" ? (
            <MDBRow className="d-flex justify-content-center align-items-center my-3">
              <MDBSpinner color="primary">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </MDBRow>
          ) : null}
          <MDBBtn
            type="submit"
            className="mb-4 mt-2 mx-auto btn-rounded"
            style={{
              backgroundColor: darkMode ? "#455B8E" : "#A060FF",
              width: "70%",
            }}
          >
            Sign in
          </MDBBtn>
        </MDBRow>

        <div className="text-center">
          <p className={`${darkMode ? "text-light" : "text-dark"}`}>
            Not a member?
            <span
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {" "}
              Register{" "}
            </span>
          </p>
          <img src={logo} className="Login-logo-form" />
        </div>
      </form>
    </div>
  );
}

export default Login;

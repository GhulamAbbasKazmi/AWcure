import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/user/userActions";

import { MDBInput, MDBRow, MDBBtn, MDBRadio, MDBCol } from "mdb-react-ui-kit";

import useWindowSize from "../../utils/useWindowSize";
import "./Signup.css";

import youngDoc from "../../assets/3d-young-doctor-man.png";

function Signup({ darkMode }) {
  const { loading, userInfo, signup_error, signup_success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { width, height } = useWindowSize();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/profile");
    // redirect user to login page if registration was successful
    // if (success) navigate("/login");
  }, [navigate, userInfo]);

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [gender, setGender] = useState("male");
  const [userType, setUserType] = useState("doctor");

  useEffect(() => {
    if (userName == "") {
      setUserNameError("");
    } else if (userName.length < 5) {
      setUserNameError("User name should be atleast of 5 characters");
    } else {
      setUserNameError("");
    }
  }, [userName]);

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
    if (password == "") {
      setPasswordError("");
    } else if (password.length < 5) {
      setPasswordError("Password should be atleast of 5 characters");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword == "") {
      setConfirmPasswordError("");
    } else if (password != confirmPassword) {
      setConfirmPasswordError("Password mismatch");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName == "") {
      setUserNameError("User name is empty");
    }

    if (email == "") {
      setEmailError("Email is empty");
    }
    if (password == "") {
      setPasswordError("Password is empty");
    }

    if (confirmPassword == "") {
      setConfirmPasswordError("Confirm Password is empty");
    }

    if (
      userNameError == "" &&
      emailError == "" &&
      passwordError == "" &&
      confirmPasswordError == "" &&
      userName != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      dispatch(
        registerUser({
          username: userName,
          email,
          password,
          gender,
          user_type: userType,
        })
      );

      console.log("register User!");
    } else {
      console.log("Error!");
    }
  };

  const [signupMessage, setSignupMessage] = useState("");
  useEffect(() => {
    if (signup_success) {
      setSignupMessage("User has been Registered Successfully!");
    }
    if (signup_error) {
      setSignupMessage(signup_error);
    }
  }, [signup_success, signup_error]);

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeUserType = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div className="Signup-main">
      <form
        className={`${darkMode ? "loginForm-dark" : "loginForm"}`}
        onSubmit={handleSubmit}
      >
        {signupMessage != "" && signup_success ? (
          <div className="Login-form-field-text-message text-success">
            {signupMessage} <i className="fas fa-check-double text-success"></i>
          </div>
        ) : signupMessage != "" && signup_error ? (
          <div className="Login-form-field-error-meesage">
            {signupMessage}{" "}
            <i className="fas fa-exclamation-triangle text-danger"></i>{" "}
            <span
              onClick={() => setSignupMessage("")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {" "}
              Try again{" "}
            </span>
          </div>
        ) : (
          <>
            <div className="Signup-form-field-text-message">
              {userNameError == "" ? (
                <div
                  className={`Login-form-field-text ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  User Name{" "}
                  {userName != "" ? (
                    <i className="fas fa-check-double text-success"></i>
                  ) : null}
                </div>
              ) : (
                <div className="Signup-form-field-error-meesage">
                  {userNameError}
                </div>
              )}
            </div>

            <MDBInput
              className="mb-4 mt-2"
              type="text"
              id="form2Example1"
              label="User name"
              contrast={!darkMode ? false : true}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

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
                <div className="Login-form-field-error-meesage">
                  {emailError}
                </div>
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

            <div className="Login-form-field-text-message">
              {confirmPasswordError == "" ? (
                <div
                  className={`Login-form-field-text ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Confirm Password{" "}
                  {confirmPassword != "" ? (
                    <i className="fas fa-check-double text-success"></i>
                  ) : null}
                </div>
              ) : (
                <div className="Login-form-field-error-meesage">
                  {confirmPasswordError}
                </div>
              )}
            </div>

            <MDBInput
              className="mb-4 mt-2"
              type="password"
              id="form2Example2"
              label="Confirm password"
              contrast={!darkMode ? false : true}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <MDBRow className="mb-4">
              <MDBCol>
                <div
                  className={`Login-form-field-text ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  User Type
                </div>
              </MDBCol>
              <MDBCol>
                <MDBRadio
                  name="UserTypeRadio"
                  id="UserTypeRadioPatient"
                  label="Patient"
                  value="patient"
                  onChange={onChangeUserType}
                />
              </MDBCol>
              <MDBCol>
                {" "}
                <MDBRadio
                  name="UserTypeRadio"
                  id="UserTypeRadioDoctor"
                  label="Doctor"
                  value="doctor"
                  defaultChecked
                  onChange={onChangeUserType}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol>
                <div
                  className={`Login-form-field-text ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Gender
                </div>
              </MDBCol>
              <MDBCol>
                <MDBRadio
                  name="GenderRadio"
                  id="GenderRadioMale"
                  label="Male"
                  value="male"
                  defaultChecked
                  onChange={onChangeGender}
                />
              </MDBCol>
              <MDBCol>
                {" "}
                <MDBRadio
                  name="GenderRadio"
                  id="GenderRadioFemale"
                  label="Female"
                  value="female"
                  onChange={onChangeGender}
                />
              </MDBCol>
              <MDBCol>
                {" "}
                <MDBRadio
                  name="GenderRadio"
                  id="GenderRadioOther"
                  label="Other"
                  value="other"
                  onChange={onChangeGender}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBBtn
                type="submit"
                className="mb-4 col-7 mx-auto  btn-rounded"
                style={{ backgroundColor: darkMode ? "#455B8E" : "#A060FF" }}
              >
                Register!
              </MDBBtn>
            </MDBRow>
          </>
        )}

        <div className="text-center">
          <p className={`${darkMode ? "text-light" : "text-dark"}`}>
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {" "}
              Login{" "}
            </span>
          </p>
        </div>
      </form>
      {width >= 835 ? (
        <div className="logo-image-section">
          <img src={youngDoc} className="Login-illustration" />
        </div>
      ) : null}
    </div>
  );
}

export default Signup;

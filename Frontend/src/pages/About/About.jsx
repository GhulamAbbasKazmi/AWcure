import { useState } from "react";
import "./About.css";
import useWindowSize from "../../utils/useWindowSize";

import maleChat from "../../assets/3d-doctors-in-lab.png";
import bubbleChat from "../../assets/3d-blue-pill-package.png";
import logo from "../../assets/logo.png";

const About = ({ darkMode }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="About-main">
      {width >= 835 ? (
        <div className="logo-image-section">
          <img src={maleChat} className="about-male-chat-illustration" />
        </div>
      ) : null}
      <div className={`${darkMode ? "aboutForm-dark" : "aboutForm"}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p
            className={` ${darkMode ? "text-light" : "text-dark"}`}
            style={{
              fontSize: "3rem",
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            About!
          </p>

          {width >= 400 ? (
            <img src={logo} className="about-chat-bubble" />
          ) : null}
        </div>
        <div
          className={`"Login-form-field-text-message" ${
            darkMode ? "text-light" : "text-dark"
          }`}
          style={{
            padding: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          At AW-CURE, we are dedicated to providing the highest quality
          healthcare to our patients. Our team of skilled professionals is
          committed to delivering compassionate, personalized care to each and
          every one of our patients. Thank you for considering AW CURE for your
          healthcare needs. We look forward to serving you and your family.
        </div>

        <div
          className={`d-flex justify-content-around align-items-center last-sec-profile ${
            darkMode ? "text-light" : "text-dark"
          }`}
        >
          <footer>&copy; Copyright 2022 AW CURE</footer>
          {width >= 400 ? (
            <img src={bubbleChat} className="about-chat-bubble" />
          ) : null}
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textAlign: "end",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            Be Healthy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

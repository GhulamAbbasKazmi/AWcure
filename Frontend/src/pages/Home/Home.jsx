import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Home.css";
import useWindowSize from "../../utils/useWindowSize";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import nurseIllustration from "../../assets/nurse-with-syringe.png";
import nurse from "../../assets/nurse.jpg";
import patientOnBed from "../../assets/patient-on-bed.jpg";
import books from "../../assets/3d-books.png";
import greenPillBox from "../../assets/3d-green-pill-box.png";
import heartAndStethoscope from "../../assets/3d-heart-and-stethoscope.png";
import femaleAvatar1 from "../../assets/female-avatar-1.png";
import femaleAvatar2 from "../../assets/female-avatar-2.png";
import femaleAvatar3 from "../../assets/female-avatar-3.png";
import maleAvatar1 from "../../assets/male-avatar-1.png";
import maleAvatar2 from "../../assets/male-avatar-2.png";
import childDoctor from "../../assets/child-doctor.jpg";
import backgroundLeaves from "../../assets/background-leaves.jpg";
import patientReview from "../../assets/patient-review.jpg";
import caution from "../../assets/caution.jpg";
import microscope from "../../assets/microscope.png";
import accessibility from "../../assets/people-looking-at-gadgets.png";
import care from "../../assets/3d-green-mask.png";
import expertCare from "../../assets/3d-female-doctor-at-desk.png";
import patientCenteric from "../../assets/girl-working-working-on-computer.png";
import sofa from "../../assets/sofa.jpg";

const Home = () => {
  const { width, height } = useWindowSize();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 769, min: 0 },
      items: 1,
    },
  };
  const responsiveWhyChoose = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="Home-main">
      <div
        id="intro-example"
        className="p-3 text-center"
        style={{
          backgroundImage: `url(${nurse})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCard className="hero-card mb-3">
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="6"
                className="d-flex justify-content-around align-items-center flex-column text-white"
              >
                {width >= 300 ? (
                  <h1>
                    At AW Cure, we are dedicated to providing top-quality
                    healthcare to our patients
                  </h1>
                ) : null}
                <h4>
                  Looking for the best medical care in the area? You've come to
                  the right place
                </h4>

                {width >= 1065 ? (
                  <div className="heroSecBtnsContainer">
                    <MDBCol md="6" className="m-2">
                      <MDBBtn
                        className="btn-rounded heroSecBtn-1"
                        style={{
                          width: "100%",
                        }}
                      >
                        Book appointment
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6" className="m-2">
                      <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                          width: "100%",
                        }}
                      >
                        Learn more
                      </MDBBtn>
                    </MDBCol>
                  </div>
                ) : null}
              </MDBCol>
              <MDBCol
                md="6"
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  className="nurse-illustration"
                  src={nurseIllustration}
                  alt="nurse"
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        {width < 1065 ? (
          <div className="heroSecBtnsContainer-2">
            <MDBCol className="my-3 w-100 mx-1">
              <MDBBtn
                className="btn-rounded heroSecBtn-1"
                style={{
                  width: "100%",
                  height: "70px",
                }}
              >
                Book appointment
              </MDBBtn>
            </MDBCol>
            <MDBCol className="w-100 mx-1">
              <MDBBtn
                className="btn-rounded heroSecBtn-2"
                style={{
                  width: "100%",
                  height: "70px",
                }}
              >
                Learn more
              </MDBBtn>
            </MDBCol>
          </div>
        ) : null}

        {width < 260 ? (
          <MDBRow className="my-4 ">
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={heartAndStethoscope}
                  className="card-image"
                  alt="books"
                />
                <MDBCardText>Treatment</MDBCardText>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={books}
                  className="card-image"
                  alt="books"
                  style={{ marginLeft: "15%" }}
                />
                <MDBCardText>Consultation</MDBCardText>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                <img
                  src={greenPillBox}
                  className="card-image"
                  alt="books"
                  style={{ marginLeft: "10%" }}
                />
                <MDBCardText>Pharmacy</MDBCardText>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (
          <MDBCard className="hero-card my-4">
            <MDBCardBody>
              <h1 className=" text-white">Are You Looking For:</h1>
              <MDBRow className="my-4 ">
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={heartAndStethoscope}
                      className="card-image"
                      alt="books"
                    />
                    <MDBCardTitle>Treatment</MDBCardTitle>
                    <MDBCardText>Book Appointment</MDBCardText>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={books}
                      className="card-image"
                      alt="books"
                      style={{ marginLeft: "15%" }}
                    />
                    <MDBCardTitle>Consultation</MDBCardTitle>
                    <MDBCardText> Talk with Experts</MDBCardText>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                  <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCard">
                    <img
                      src={greenPillBox}
                      className="card-image"
                      alt="books"
                      style={{ marginLeft: "10%" }}
                    />
                    <MDBCardTitle>Pharmacy</MDBCardTitle>
                    <MDBCardText>Explore Medicines</MDBCardText>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        )}
      </div>
      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${patientOnBed})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCard className="hero-card">
          <MDBCardBody>
            <MDBRow className="text-white my-4">
              <h1>Our Satisfied Patients</h1>
              <h4>
                At our medical center, we prioritize patient safety and
                satisfaction. Trust us to provide you with the best possible
                care
              </h4>
            </MDBRow>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              infinite={true}
              customTransition={"transform 1000ms ease-in-out"}
            >
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar1} className="card-image" alt="books" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I found this website to
                  be incredibly helpful when trying to research my symptoms. The
                  information was clear and easy to understand, and the symptom
                  checker was accurate. I would definitely recommend this
                  website to others.
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jessie
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>

              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar2} className="card-image" alt="books" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>As a first-time user of
                  this website, I was impressed by the user-friendly interface
                  and the wealth of information available. The symptom checker
                  helped me understand my condition and the articles provided me
                  with helpful tips on how to manage it."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Alva
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={femaleAvatar3} className="card-image" alt="books" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I've been using this
                  website for a while now and I am extremely impressed with the
                  quality of information it provides. The articles are
                  well-researched and easy to understand, and the medical
                  professionals are always available to answer any questions I
                  have."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Elsa
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={maleAvatar1} className="card-image" alt="books" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I was pleasantly
                  surprised by how easy it was to find relevant information on
                  this website. The search function is very efficient and the
                  information is presented in an easy-to-understand manner. I
                  would definitely recommend this website to others."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jack
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
              <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardTestimonial">
                <img src={maleAvatar2} className="card-image" alt="books" />
                <MDBCardTitle className="mt-3">
                  <i className="fas fa-quote-left pe-2"></i>I have been dealing with
                  a chronic condition for years, and this website has been a
                  lifesaver for me. The articles are written by experts in the
                  field and are packed with useful information. I also
                  appreciate the support forum where I can connect with other
                  patients who are dealing with similar issues."
                </MDBCardTitle>
                <MDBCardText className="fw-bold">
                  Jhon
                </MDBCardText>
                <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="fas fa-star fa-sm"></i>
                  </li>
                  <li>
                    <i className="far fa-star fa-sm"></i>
                  </li>
                </ul>
              </MDBCard>
            </Carousel>
          </MDBCardBody>
        </MDBCard>
      </div>
      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${childDoctor})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <MDBCardBody>
          <MDBRow
            className="text-white "
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
            }}
          >
            <h1 className="fw-bold my-4">Why to choose AW Cure</h1>
          </MDBRow>
          <Carousel
            className="my-4"
            responsive={responsiveWhyChoose}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            infinite={true}
            customTransition={"transform 1000ms ease-in-out"}
          >
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={expertCare} className="card-image" alt="books" />
              <MDBCardTitle className="mt-3 fw-bold">
                Expert Care, Exceptional Service
              </MDBCardTitle>
              <MDBCardText>
                Highlighting the qualifications and experience of the medical
                staff, as well as the facility's commitment to providing
                excellent patient care.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={microscope} className="card-image" alt="books" />
              <MDBCardTitle className="mt-3 fw-bold">
                Advanced Technology and Techniques
              </MDBCardTitle>
              <MDBCardText>
                Showcasing the state-of-the-art equipment and techniques used to
                diagnose and treat patients.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={care} className="card-image" alt="books" />
              <MDBCardTitle className="mt-3 fw-bold">
                Comprehensive Care for All Ages
              </MDBCardTitle>
              <MDBCardText>
                Emphasizing the wide range of medical services offered,
                including primary care, specialized treatments, and preventative
                care for all ages.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={patientCenteric} className="card-image" alt="books" />
              <MDBCardTitle className="mt-3 fw-bold">
                Patient-Centered Approach
              </MDBCardTitle>
              <MDBCardText>
                Promoting the practice's focus on listening to patients,
                understanding their needs and concerns, and working together to
                achieve their health goals.
              </MDBCardText>
            </MDBCard>
            <MDBCard className="d-flex justify-content-around align-items-center p-4 m-2 heroSecCardWhyChoose">
              <img src={accessibility} className="card-image" alt="books" />
              <MDBCardTitle className="mt-3 fw-bold">
                Convenience and Accessibility
              </MDBCardTitle>
              <MDBCardText>
                Highlighting the location, hours of operation, and online
                resources available to make it easy for patients to schedule
                appointments, access medical records, and communicate with their
                healthcare provider.
              </MDBCardText>
            </MDBCard>
          </Carousel>
        </MDBCardBody>

        <div>
          <MDBRow
            className="text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
              width:"100%"
            }}
          >
            <h1 className="fw-bold my-4">Our Recent Articles</h1>
          </MDBRow>

          <div className="blog-card p-3 my-2">
            <img src={backgroundLeaves} className="home-blog-image" />

            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
                Healthy Living Tips and Tricks
              </MDBCardTitle>
              <MDBCardText className="my-3">
                Sharing advice and information on how to maintain a healthy
                lifestyle, including diet, exercise, and stress management.
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
          </div>

          <div className="blog-card p-3 my-2">
            {width <= 996 ? (
              <img src={patientReview} className="home-blog-image" />
            ) : null}
            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
                Medical Breakthroughs and Research
              </MDBCardTitle>
              <MDBCardText className="my-3">
                Highlighting recent developments and research in the medical
                field, and how they can benefit patients.
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
            {width > 996 ? (
              <img src={patientReview} className="home-blog-image" />
            ) : null}
          </div>

          <div className="blog-card p-3 my-2">
            <img src={caution} className="home-blog-image" />

            <div className="blog-text-container text-white my-4">
              <MDBCardTitle className="fw-bold">
                Disease Prevention and Management
              </MDBCardTitle>
              <MDBCardText className="my-3">
                Providing in-depth information and guidance on specific
                diseases, including causes, symptoms, treatment options, and
                ways to reduce the risk of developing the disease.
              </MDBCardText>
              <MDBBtn className="blogCardBtn">Read More</MDBBtn>
            </div>
          </div>
        </div>
      </div>

      <div
        id="intro-example"
        className="text-center"
        style={{
          backgroundImage: `url(${sofa})`,
          height: "100%",
          borderBottom: "3px solid black",
        }}
      >
        <div className="mb-5">
          <div
            className="p-2 text-white d-flex justify-content-center align-items-center flex-column"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
            }}
          >
            <h1 className="fw-bold my-4">Join Us</h1>
            <MDBCardTitle className="fw-bold">
              Subscribe for news update from AW Cure
            </MDBCardTitle>

            <div className="my-4 subscribe-email-container">
              <div className="mx-3 w-100">
                <MDBInput contrast type="email" label="Email address" />
              </div>

              <div>
                <MDBBtn outline color="light" className="my-3">
                  Subscribe
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

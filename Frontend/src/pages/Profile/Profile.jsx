import styled, { keyframes, css } from 'styled-components'
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  removeUser,
  updateUserDetails,
  updateUserDocs,
  removeUserDocs,
  verifyEmailLink,
  verifyEmail,
  getAllUsers
} from "../../features/user/userActions";

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInputGroup,
  MDBIcon,
  MDBCardTitle,
  MDBRadio,
  MDBBadge,
  MDBRipple,

  MDBTable,
  MDBTableHead,
  MDBTableBody,

} from "mdb-react-ui-kit";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";
import dropDownOptionSelected from "../../assets/dropDownOptionSelected.svg";

import "./Profile.css";
import ComplaintDetails from '../../components/ComplaintDetails/ComplaintDetails';


let scaleZ = keyframes`
  0% {
      opacity: 0;
      transform: scale(0);
  }

  80% {
      transform: scale(1.07);
  }

  100% {
      opacity: 1;
      transform: scale(1);
  }
`


const DropDownItem = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;

  &:hover {
      background: #E9E9E9;
  }

  ${props => props.active && css`
  background: #C2FFED;
  `}

  transform-origin: top center;
  
  ${props => props.index && css`
  animation: ${scaleZ} 300ms ${60 * (props.index)}ms ease-in-out forwards;
`}
  `


function Profile({ darkMode }) {

  const location = useLocation();
  const { userId, token } = useParams();

  const state = location.state;

  const [basicModal, setBasicModal] = useState(false);
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);

  const [basicModalUpdateDocs, setBasicModalUpdateDocs] = useState(false);
  const [basicModalRemoveDocs, setBasicModalRemoveDocs] = useState(false);

  const [viewDocs, setViewDocs] = useState([]);



  const {
    loading,
    userInfo,
    update_error,
    delete_error,
    update_success,
    delete_success,
    verify_link_error,
    verify_link_success,
    verify_error,
    verify_success,
    docs_remove_error,
    docs_remove_success,
    allUsers
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verticalActive, setVerticalActive] = useState("tab1");

  const [accountVerified, setAccountVerified] = useState(false);

  const [editName, setEditName] = useState({
    check: false,
    value: "",
  });
  const [editGender, setEditGender] = useState({
    check: false,
    value: "",
  });
  const [editPassword, setEditPassword] = useState({
    check: false,
    show: false,
    value: "password",
  });
  const [editMobile, setEditMobile] = useState({
    check: false,
    value: "",
  });
  const [editAddress, setEditAddress] = useState({
    check: false,
    value: "",
  });
  const [imageUrl, setImageUrl] = useState(null);

  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [userDocuments, setUserDocuments] = useState([]);
  const [filterUserDocuments, setFilterUserDocuments] = useState([]);
  const [userDocumentsSelected, setUserDocumentsSelected] = useState([]);

  const [warningReplies, setWarningReplies] = useState([]);

  const [uploadFileSelectedError, setUploadFileSelectedError] = useState("");



  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('00:00');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    if (userId && token) {
      setVerticalActive("tab2");
      dispatch(verifyEmail({ userId, token }));
    }
  }, [userId]);

  useEffect(() => {
    if (state?.tab) {
      setVerticalActive(state?.tab);
    }
  }, [state]);

  useEffect(() => {
    setEditName({ ...editName, value: userInfo?.username });
    setEditMobile({ ...editMobile, value: userInfo?.mobile });
    setEditAddress({ ...editAddress, value: userInfo?.address });
    setEditGender({ ...editGender, value: userInfo?.gender });
    setImageUrl(userInfo?.image?.url);
    setUserDocuments(userInfo?.documents);
    setAccountVerified(userInfo.is_verified);
    setFilterUserDocuments(userInfo?.documents);
  }, [userInfo]);

  useEffect(() => {
    if (update_success) {
      setUpdateMessage("Updated Successfully!");
    }
    if (update_error) {
      setUpdateMessage(update_error);
    }
  }, [update_success, update_error]);

  useEffect(() => {
    if (docs_remove_success) {
      setDeleteMessage("Documents removed Successfully!");
    }
    if (docs_remove_error) {
      setDeleteMessage(docs_remove_error);
    }
  }, [docs_remove_error, docs_remove_success]);

  useEffect(() => {
    if (delete_success) {
      setDeleteMessage("Account Deleted Successfully!");
    }
    if (delete_error) {
      setDeleteMessage(delete_error);
    }
  }, [delete_success, delete_error]);

  const openUpdateModal = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setUpdateMessage("");
  };

  const openDeleteModal = () => {
    setBasicModal(!basicModal);
    setDeleteMessage("");
  };

  const closeModalAfterUpdate = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setEditName({ ...editName, check: false });
    setEditMobile({ ...editMobile, check: false });
    setEditAddress({ ...editAddress, check: false });
    setEditGender({ ...editGender, check: false });
  };

  const closeModalAfterUpdateDocs = () => {
    setBasicModalUpdateDocs(!basicModalUpdateDocs);
    setSelectedDocuments([]);
    setDocumentsToBase64([]);
  };

  const closeModalAfterRemoveDocs = () => {
    setBasicModalRemoveDocs(!basicModalRemoveDocs);

    setUserDocumentsSelected([]);
    setViewDocs([]);
  };

  const closeModalAfterDelete = () => {
    setBasicModal(!basicModal);
    if (delete_success) {
      navigate("/");
    }
  };

  const inputElement = useRef();
  const inputElementUpload = useRef();
  const inputElementComplaintImage = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToBase64, setImageToBase64] = useState(null);

  const [selectedImageComplaint, setSelectedImageComplaint] = useState(null);

  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentsToBase64, setDocumentsToBase64] = useState([]);

  const [complaint, setComplaint] = useState({
    title: "",
    from: userInfo?.id,
    to: null,
    image: { imageToBase64: null, url: null },
    text: ""
  });
  const [complaintError, setComplaintError] = useState('')

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [option, setOption] = useState(null)

  const [showComplaintDetails, setShowComplaintDetails] = useState(null);

  useEffect(() => {
    if (selectedImageComplaint) {

      const reader = new FileReader();
      reader.readAsDataURL(selectedImageComplaint);
      reader.onloadend = () => {
        setComplaint({ ...complaint, image: { ...complaint.image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImageComplaint) } })
      };
    }
  }, [selectedImageComplaint]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setImageToBase64(reader.result);
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedDocuments.length != 0) {
      if (selectedDocuments[selectedDocuments?.length - 1]) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedDocuments[selectedDocuments?.length - 1]);
        reader.onloadend = () => {
          setDocumentsToBase64([
            ...documentsToBase64,
            {
              name: selectedDocuments[selectedDocuments?.length - 1].name,
              base64: reader.result,
            },
          ]);
        };
      }
    }
  }, [selectedDocuments]);

  const changeImage = () => {
    inputElement.current.click();
  };

  const changeDocument = () => {
    inputElementUpload.current.click();
    setUserDocumentsSelected([]);
    setUploadFileSelectedError("");
  };

  const removeDocumentsBeforeUpload = () => {
    setSelectedDocuments([]);
    setDocumentsToBase64([]);
    setUploadFileSelectedError("");
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
    setImageToBase64(null);
  };


  const changeSectionImage = () => {
    inputElementComplaintImage.current.click();
  };

  const removeSectionImage = () => {
    setSelectedImageComplaint(null);
    setComplaint({ ...complaint, image: { ...complaint.image, imageToBase64: null, url: null } })
  };

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    dispatch(getAllUsers({}))
    setVerticalActive(value);
  };

  const verifyEmailHandler = () => {
    dispatch(verifyEmailLink());
  };

  const searchDocs = (e) => {
    if (e.target.value == "") {
      setFilterUserDocuments(userDocuments);
    } else {
      var filterDocs = userDocuments.filter((doc) => {
        const doc_name = doc.public_id
          .substring(doc.public_id.indexOf("/") + 1, doc.public_id.length)
          .toLowerCase();
        if (doc_name.includes(e.target.value.toLowerCase())) {
          return doc;
        }
      });

      setFilterUserDocuments(filterDocs);
    }
  };

  const getDateTime = (date_) => {
    const date = new Date(Date.parse(date_))
    const day = date.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })
    const time = [date.getHours(), date.getMinutes(),].join(':')

    return { day, time }
  }


  const submitComplaint = () => {

    if (complaint.title == "") {
      setComplaintError('Complaint title is empty!')
    }

    else if (complaint.to == null) {
      setComplaintError('Complaint defendant is not selected!')
    }

    else if (complaint.text == "") {
      setComplaintError('Complaint text is empty!')
    }
    else {
      setComplaintError(null)
      dispatch(updateUserDetails({ email: userInfo?.email, complaint }))
    }
  }

  console.log('allUsers', allUsers)

  return (
    <div className="Profile-main">
      <p
        className={` ${darkMode ? "text-light" : "text-dark"}`}
        style={{
          fontSize: "3rem",
          marginTop: "2rem",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Profile
      </p>
      <div className={`${darkMode ? "ProfileForm-dark" : "ProfileForm"} mb-6`}>
        <MDBRow>
          <MDBCol md="3">
            <MDBTabs
              pills
              style={{ marginLeft: "0px" }}
              className="flex-column text-center"
            >
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab1")}
                  active={verticalActive === "tab1"}
                >
                  Profile
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab2")}
                  active={verticalActive === "tab2"}
                >
                  Documents
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab4")}
                  active={verticalActive === "tab4"}
                >
                  Complaints
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab5")}
                  active={verticalActive === "tab5"}
                >
                  Orders
                </MDBTabsLink>
              </MDBTabsItem>

              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab6")}
                  active={verticalActive === "tab6"}
                >
                  Appointment
                </MDBTabsLink>
              </MDBTabsItem>

            </MDBTabs>
          </MDBCol>

          <MDBCol md="9">
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "tab1"}>
                <MDBContainer>
                  <MDBRow>
                    <MDBCol>
                      <MDBCard
                        className={`mb-4 ${darkMode ? " text-white bg-dark" : ""
                          }`}
                      >
                        <MDBCardBody className="text-center">
                          <MDBBadge color={userInfo?.status == 'Active' ? 'success' : userInfo?.status == 'Warned' ? 'warning' : 'danger'} pill>
                            {userInfo.status}
                          </MDBBadge>
                          <MDBCardImage
                            src={
                              imageUrl
                                ? imageUrl
                                : userInfo.gender == "female"
                                  ? femaleAvatar
                                  : maleAvatar
                            }
                            alt="avatar"
                            className="rounded-circle profile-image"
                          />

                          <div className="d-flex justify-content-center mt-4 mb-4">
                            <MDBRow>
                              <MDBCol className="mb-2">
                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElement}
                                  onChange={(e) => {
                                    setSelectedImage(e.target.files[0]);
                                    e.target.value = null;
                                  }}
                                />
                                <MDBBtn
                                  className="btn-rounded"
                                  style={{
                                    backgroundColor: darkMode
                                      ? "#455B8E"
                                      : "#A060FF",
                                  }}
                                  onClick={changeImage}
                                >
                                  Change
                                </MDBBtn>
                              </MDBCol>
                              <MDBCol>
                                <MDBBtn
                                  color="danger"
                                  className="btn-rounded"
                                  style={{
                                    backgroundColor: darkMode ? "#581845" : "",
                                  }}
                                  onClick={removeImage}
                                >
                                  Remove
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                      <MDBCard
                        className={`mb-4 ${darkMode ? " text-white bg-dark" : ""
                          }`}
                      >
                        <MDBCardBody>
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Username</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editName.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.username}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="User name"
                                  contrast={!darkMode ? false : true}
                                  value={editName.value}
                                  onChange={(e) =>
                                    setEditName({
                                      ...editName,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editName.check ? (
                                <i
                                  onClick={() =>
                                    setEditName({ ...editName, check: false })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditName({ ...editName, check: true })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Email</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {userInfo?.email}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          {/* <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Password</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editPassword.check ? (
                                <MDBCardText className="text-muted">
                                  {editPassword.show
                                    ? editPassword.value
                                    : "*********"}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="password"
                                  id="form2Example1"
                                  label="Password"
                                  contrast={!darkMode ? false : true}
                                  value={editPassword.value}
                                  onChange={(e) =>
                                    setEditPassword({
                                      ...editPassword,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>

                            <MDBCol
                              sm="2"
                              className="d-flex justify-content-between"
                            >
                              {editPassword.check ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: false,
                                    })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: true,
                                    })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}

                              {editPassword.show ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: false,
                                    })
                                  }
                                  className="far fa-eye-slash profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: true,
                                    })
                                  }
                                  className="far fa-eye profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow> */}
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Gender</MDBCardText>
                            </MDBCol>

                            <MDBCol sm="7">
                              {!editGender.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.gender}
                                </MDBCardText>
                              ) : (
                                <MDBRow>
                                  <MDBCol>
                                    <MDBRadio
                                      name="GenderRadio"
                                      id="GenderRadioMale"
                                      label="Male"
                                      value="male"
                                      defaultChecked={
                                        "male" == editGender.value
                                      }
                                      onChange={(e) =>
                                        setEditGender({
                                          ...editGender,
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </MDBCol>
                                  <MDBCol>
                                    {" "}
                                    <MDBRadio
                                      name="GenderRadio"
                                      id="GenderRadioFemale"
                                      label="Female"
                                      value="female"
                                      defaultChecked={
                                        "female" == editGender.value
                                      }
                                      onChange={(e) =>
                                        setEditGender({
                                          ...editGender,
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </MDBCol>
                                  <MDBCol>
                                    {" "}
                                    <MDBRadio
                                      name="GenderRadio"
                                      id="GenderRadioOther"
                                      label="Other"
                                      value="other"
                                      defaultChecked={
                                        "other" == editGender.value
                                      }
                                      onChange={(e) =>
                                        setEditGender({
                                          ...editGender,
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </MDBCol>
                                </MDBRow>
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editGender.check ? (
                                <i
                                  onClick={() =>
                                    setEditGender({
                                      ...editGender,
                                      check: false,
                                    })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditGender({
                                      ...editGender,
                                      check: true,
                                    })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Mobile</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editMobile.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.mobile}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="Mobile"
                                  contrast={!darkMode ? false : true}
                                  value={editMobile.value}
                                  onChange={(e) =>
                                    setEditMobile({
                                      ...editMobile,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editMobile.check ? (
                                <i
                                  onClick={() =>
                                    setEditMobile({
                                      ...editMobile,
                                      check: false,
                                    })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditMobile({
                                      ...editMobile,
                                      check: true,
                                    })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Address</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editAddress.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.address}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="Address"
                                  contrast={!darkMode ? false : true}
                                  value={editAddress.value}
                                  onChange={(e) =>
                                    setEditAddress({
                                      ...editAddress,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editAddress.check ? (
                                <i
                                  onClick={() =>
                                    setEditAddress({
                                      ...editAddress,
                                      check: false,
                                    })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditAddress({
                                      ...editAddress,
                                      check: true,
                                    })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>

                  <MDBCard
                    className={`${darkMode ? " text-white bg-dark" : ""}`}
                  >
                    <div className="d-flex justify-content-between align-items-center m-4 profileButtons">
                      <MDBCol className="flex-2 mx-1">
                        <MDBBtn
                          color="success"
                          className="mb-2 btn-rounded"
                          style={{
                            backgroundColor: darkMode ? "#455B8E" : "",
                            width: "100%",
                          }}
                          onClick={openUpdateModal}
                        >
                          Update Profile
                        </MDBBtn>
                      </MDBCol>

                      <MDBCol className="flex-2 mx-1">
                        <MDBBtn
                          color="danger"
                          className="mb-2 btn-rounded"
                          style={{
                            backgroundColor: darkMode ? "#581845" : "",
                            width: "100%",
                          }}
                          onClick={openDeleteModal}
                        >
                          Remove Account
                        </MDBBtn>
                      </MDBCol>
                    </div>
                  </MDBCard>

                  {userInfo?.warnings?.length != 0 &&
                    <div className="warningInfoContainer">
                      <div className="commentsHeading">Warnings</div>
                      {
                        userInfo?.warnings?.map((warningObj, index) => (

                          <div className="warningText" key={index}>
                            <div className="warningTextContainer">
                              <div className="commentText">
                                {warningObj?.warning}
                              </div>
                            </div>
                            <div className="blogInfoTopRow">
                              <div className="blogUser">
                                <MDBCardImage
                                  src={
                                    warningObj?.user?.image?.url
                                      ? warningObj?.user?.image?.url
                                      : warningObj?.user?.gender == "female"
                                        ? femaleAvatar
                                        : maleAvatar
                                  }
                                  alt="avatar"
                                  className="rounded-circle m-2"
                                  style={{ width: "50px", height: "50px", objectFit: "cover" }}

                                />
                                {warningObj?.user?.username}</div>
                              <div className="blogDate">{getDateTime(warningObj?.createdAt).time + "  " + getDateTime(warningObj?.createdAt).day}</div>
                            </div>

                            <div className="warningReplyContainer">

                              {
                                <div className="replyWrite">
                                  <div className="replyInput">
                                    <textarea className="replyTextArea"
                                      value={warningReplies[index]?.reply}
                                      onChange={(e) => {
                                        warningReplies.splice(index, 1, { reply: e.target.value, index })
                                        setWarningReplies([...warningReplies])
                                      }}
                                      placeholder={"Reply Text"}
                                    />
                                  </div>
                                  <div className="postReply">
                                    {loading ?
                                      <div className="my-3">
                                        <MDBSpinner color="primary">
                                          <span className="visually-hidden">Loading...</span>
                                        </MDBSpinner> </div>
                                      :
                                      <MDBBtn className='replyBtn' color='primary' onClick={() => warningReplies[index].reply != "" && dispatch(updateUserDetails({ email: userInfo?.email, warning_id: warningObj?._id, reply: warningReplies[index].reply }))}>
                                        Post Reply {" "}<MDBIcon fas icon="pencil-alt" />
                                      </MDBBtn>}
                                  </div>
                                </div>
                              }

                              {warningObj?.replies?.map((replyObj, index) => (
                                <>
                                  <div className="warningReplyTextContainer" key={index}>
                                    <div className="commentText">
                                      {replyObj?.reply}
                                    </div>
                                    {loading ?
                                      <div className="my-3">
                                        <MDBSpinner color="primary">
                                          <span className="visually-hidden">Loading...</span>
                                        </MDBSpinner> </div>
                                      : (replyObj?.user?.email == userInfo?.email) &&
                                      <MDBIcon
                                        onClick={() => dispatch(updateUserDetails({ email: userInfo?.email, warning_id: warningObj?._id, delete_reply_id: replyObj?._id }))}
                                        className="delIconComment" fas icon="trash" />

                                    }
                                  </div>
                                  <div className="blogInfoTopRow">
                                    <div className="blogUser">
                                      <MDBCardImage
                                        src={
                                          replyObj?.user?.image?.url
                                            ? replyObj?.user?.image?.url
                                            : replyObj?.user?.gender == "female"
                                              ? femaleAvatar
                                              : maleAvatar
                                        }
                                        alt="avatar"
                                        className="rounded-circle m-2"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}

                                      />
                                      {replyObj?.user?.username}</div>
                                    <div className="blogDate">{getDateTime(replyObj?.createdAt).time + "  " + getDateTime(replyObj?.createdAt).day}</div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        ))
                      }
                    </div>}

                  <MDBModal
                    show={basicModal}
                    setShow={setBasicModal}
                    tabIndex="-1"
                  >
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            { }
                            Account Deletion{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                          </MDBModalTitle>
                        </MDBModalHeader>
                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : (
                          <>
                            <MDBModalBody>
                              {deleteMessage != ""
                                ? deleteMessage
                                : "Are you sure to remove your account? "}
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                color="secondary"
                                onClick={closeModalAfterDelete}
                              >
                                Close
                              </MDBBtn>

                              {deleteMessage == "" ? (
                                <MDBBtn
                                  color="danger"
                                  onClick={() => dispatch(removeUser())}
                                >
                                  Delete Account
                                </MDBBtn>
                              ) : null}
                            </MDBModalFooter>
                          </>
                        )}
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>

                  <MDBModal
                    show={basicModalUpdate}
                    setShow={setBasicModalUpdate}
                    tabIndex="-1"
                  >
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            { }
                            Update Profile{" "}
                            <i className="fas fa-user-edit text-success"></i>
                          </MDBModalTitle>
                        </MDBModalHeader>

                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : (
                          <>
                            <MDBModalBody>
                              {updateMessage != ""
                                ? updateMessage
                                : "Are you sure to update your profile? "}
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                color="secondary"
                                onClick={closeModalAfterUpdate}
                              >
                                Close
                              </MDBBtn>

                              {updateMessage == "" ? (
                                <MDBBtn
                                  color="success"
                                  onClick={() =>
                                    dispatch(
                                      updateUserDetails({
                                        email: userInfo.email,
                                        username: editName.value,
                                        mobile: editMobile.value,
                                        address: editAddress.value,
                                        gender: editGender.value,
                                        image: imageToBase64,
                                        previous_image_id:
                                          userInfo?.image?.public_id,
                                        imageUrl,
                                      })
                                    )
                                  }
                                >
                                  Update Profile
                                </MDBBtn>
                              ) : null}
                            </MDBModalFooter>
                          </>
                        )}
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </MDBContainer>
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab2"}>
                {userInfo?.is_verified || accountVerified ? (
                  <MDBContainer>
                    <MDBCard
                      className={`${darkMode ? " text-white bg-dark" : ""}`}
                    >
                      <div className="d-flex justify-content-around align-items-center m-4 profileButtons">
                        <MDBCol className="flex-2 m-1">
                          <MDBInputGroup className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center align-items-center">
                              <MDBInput
                                label="Search"
                                placeholder=""
                                onChange={searchDocs}
                              />
                              <span className="searchIcon d-flex justify-content-center align-items-center">
                                <MDBIcon icon="search" />
                              </span>
                            </div>
                          </MDBInputGroup>
                        </MDBCol>
                        <MDBCol className="flex-1 m-1">
                          <input
                            type="file"
                            id="select-document"
                            style={{ display: "none" }}
                            ref={inputElementUpload}
                            onChange={(e) => {
                              console.log("uploaded file", e.target.files[0]);
                              if (
                                e.target.files[0] &&
                                !selectedDocuments.some((doc) => {
                                  if (doc.name == e.target.files[0].name) {
                                    setUploadFileSelectedError(
                                      `Sorry! selected document is already added with the same name: ${e.target.files[0].name.substring(
                                        0,
                                        e.target.files[0].name.lastIndexOf(".")
                                      )}!`
                                    );
                                    return true;
                                  }
                                  return false;
                                }) &&
                                !userDocuments.some((doc) => {
                                  if (
                                    doc.public_id.includes(
                                      e.target.files[0].name.substring(
                                        0,
                                        e.target.files[0].name.lastIndexOf(".")
                                      )
                                    )
                                  ) {
                                    setUploadFileSelectedError(
                                      `Sorry! selected document is already uploaded with the same name: ${e.target.files[0].name.substring(
                                        0,
                                        e.target.files[0].name.lastIndexOf(".")
                                      )}!`
                                    );
                                    return true;
                                  }
                                  return false;
                                })
                              ) {
                                setSelectedDocuments([
                                  ...selectedDocuments,
                                  e.target.files[0],
                                ]);
                              }
                              e.target.value = null;
                            }}
                          />
                          <MDBBtn
                            className="btn-rounded d-flex justify-content-between align-items-center"
                            style={{
                              backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                              width: "100%",
                            }}
                            onClick={changeDocument}
                          >
                            <i className="fas fa-upload"></i>
                            <span className="upload-btn-text">
                              Upload Document
                            </span>
                          </MDBBtn>
                        </MDBCol>
                      </div>
                      {uploadFileSelectedError != "" ? (
                        <div className="text-danger text-center m-2">
                          {uploadFileSelectedError}{" "}
                          <i className="fas fa-exclamation-triangle text-danger"></i>
                        </div>
                      ) : null}
                    </MDBCard>

                    <MDBCard
                      className={`p-4 mt-2 ${darkMode ? " text-white bg-dark" : ""
                        }`}
                    >
                      {selectedDocuments.length != 0 ? (
                        <MDBRow className="d-flex justify-content-center">
                          {selectedDocuments.map((doc, index) => {
                            const extension = doc?.name.substring(
                              doc?.name.lastIndexOf(".") + 1
                            );

                            return (
                              <MDBCol
                                key={index}
                                md={3}
                                className="d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box"
                              >
                                <i
                                  className={`fas ${extension == "pdf"
                                    ? "fa-file-pdf"
                                    : extension == "xlsx" ||
                                      extension == "xls"
                                      ? "fa-file-excel"
                                      : extension == "docx" ||
                                        extension == "doc"
                                        ? "fa-file-word"
                                        : extension == "png" ||
                                          extension == "jpg" ||
                                          extension == "jpeg"
                                          ? "fa-file-image"
                                          : "fa-file-alt"
                                    } fa-3x mx-2`}
                                ></i>
                                <span>{doc?.name}</span>
                              </MDBCol>
                            );
                          })}
                        </MDBRow>
                      ) : filterUserDocuments?.length != 0 ? (
                        <MDBRow className="d-flex justify-content-center">
                          {filterUserDocuments?.map((doc, index) => {
                            const extension = doc.url.substring(
                              doc.url.lastIndexOf(".") + 1
                            );
                            return (
                              <MDBCol
                                key={index}
                                md={3}
                                className={`d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box ${userDocumentsSelected.some(
                                  (document) => document.url == doc.url
                                )
                                  ? "selectedFileBox"
                                  : null
                                  } `}
                                onClick={() => {
                                  if (
                                    userDocumentsSelected.some(
                                      (document) => document.url == doc.url
                                    )
                                  ) {
                                    const newSelected =
                                      userDocumentsSelected.filter(
                                        (selectedDoc) =>
                                          selectedDoc.url != doc.url
                                      );

                                    const newSelectedViewDocs = newSelected.map(
                                      (document_) => {
                                        return { uri: document_.url };
                                      }
                                    );
                                    setViewDocs(newSelectedViewDocs);
                                    setUserDocumentsSelected(newSelected);
                                  } else {
                                    setViewDocs([
                                      ...viewDocs,
                                      { uri: doc.url },
                                    ]);
                                    setUserDocumentsSelected([
                                      ...userDocumentsSelected,
                                      doc,
                                    ]);
                                  }
                                }}
                              >
                                {userDocumentsSelected.some(
                                  (document) => document.url == doc.url
                                ) ? (
                                  <span className="d-flex justify-content-center align-items-center selectedFile">
                                    <i className="fas fa-check text-success"></i>
                                  </span>
                                ) : null}
                                <i
                                  className={`fas ${extension == "pdf"
                                    ? "fa-file-pdf"
                                    : extension == "xlsx" ||
                                      extension == "xls"
                                      ? "fa-file-excel"
                                      : extension == "docx" ||
                                        extension == "doc"
                                        ? "fa-file-word"
                                        : extension == "png" ||
                                          extension == "jpg" ||
                                          extension == "jpeg"
                                          ? "fa-file-image"
                                          : "fa-file-alt"
                                    } fa-3x mx-2`}
                                ></i>
                                <span>
                                  {doc.public_id.substring(
                                    doc.public_id.lastIndexOf("/") + 1
                                  )}
                                </span>
                              </MDBCol>
                            );
                          })}
                        </MDBRow>
                      ) : (
                        <p
                          className={` ${darkMode ? "text-light" : "text-dark"
                            }`}
                          style={{
                            fontSize: "20px",
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                          }}
                        >
                          No Documents Found!
                        </p>
                      )}
                    </MDBCard>

                    {userDocumentsSelected.length != 0 ||
                      documentsToBase64.length != 0 ? (
                      <MDBCard
                        className={`${darkMode ? "mt-2 text-white bg-dark" : "mt-2"
                          }`}
                      >
                        <div className="d-flex justify-content-around align-items-center m-4 profileButtons">
                          <MDBCol className="flex-2 mx-1">
                            <MDBBtn
                              color="success"
                              className="mb-2 btn-rounded"
                              style={{
                                backgroundColor: darkMode ? "#455B8E" : "",
                                width: "100%",
                              }}
                              onClick={() => {
                                if (userDocumentsSelected != 0) {
                                  setVerticalActive("tab3");
                                } else {
                                  setUpdateMessage("");
                                  setBasicModalUpdateDocs(
                                    !basicModalUpdateDocs
                                  );
                                }
                              }}
                            >
                              {userDocumentsSelected != 0
                                ? "Preview Doc(s)"
                                : "Save Doc(s)"}
                            </MDBBtn>
                          </MDBCol>

                          <MDBCol className="flex-2 mx-1">
                            <MDBBtn
                              color="danger"
                              className="mb-2 btn-rounded"
                              style={{
                                backgroundColor: darkMode ? "#581845" : "",
                                width: "100%",
                              }}
                              onClick={() => {
                                if (documentsToBase64.length != 0) {
                                  removeDocumentsBeforeUpload();
                                } else {
                                  setBasicModalRemoveDocs(
                                    !basicModalRemoveDocs
                                  );
                                  setDeleteMessage("");
                                }
                              }}
                            >
                              Remove Doc(s)
                            </MDBBtn>
                          </MDBCol>
                        </div>
                      </MDBCard>
                    ) : null}

                    <MDBModal
                      show={basicModalUpdateDocs}
                      setShow={setBasicModalUpdateDocs}
                      tabIndex="-1"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>
                              { }
                              Update Documents{" "}
                              <i className="fas fa-user-edit text-success"></i>
                            </MDBModalTitle>
                          </MDBModalHeader>

                          {loading ? (
                            <MDBRow className="d-flex justify-content-center align-items-center my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </MDBSpinner>
                            </MDBRow>
                          ) : (
                            <>
                              <MDBModalBody>
                                {updateMessage != ""
                                  ? updateMessage
                                  : "Are you sure to update your documents? "}
                              </MDBModalBody>

                              <MDBModalFooter>
                                <MDBBtn
                                  color="secondary"
                                  onClick={closeModalAfterUpdateDocs}
                                >
                                  Close
                                </MDBBtn>

                                {updateMessage == "" ? (
                                  <MDBBtn
                                    color="success"
                                    onClick={() =>
                                      dispatch(
                                        updateUserDocs({
                                          email: userInfo.email,
                                          documents: documentsToBase64,
                                        })
                                      )
                                    }
                                  >
                                    Update Document(s)
                                  </MDBBtn>
                                ) : null}
                              </MDBModalFooter>
                            </>
                          )}
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>

                    <MDBModal
                      show={basicModalRemoveDocs}
                      setShow={setBasicModalRemoveDocs}
                      tabIndex="-1"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>
                              { }
                              Remove Documents{" "}
                              <i className="fas fa-exclamation-triangle text-danger"></i>
                            </MDBModalTitle>
                          </MDBModalHeader>

                          {loading ? (
                            <MDBRow className="d-flex justify-content-center align-items-center my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </MDBSpinner>
                            </MDBRow>
                          ) : (
                            <>
                              <MDBModalBody>
                                {deleteMessage != ""
                                  ? deleteMessage
                                  : "Are you sure to remove the selected documents? "}
                              </MDBModalBody>

                              <MDBModalFooter>
                                <MDBBtn
                                  color="secondary"
                                  onClick={closeModalAfterRemoveDocs}
                                >
                                  Close
                                </MDBBtn>

                                {deleteMessage == "" ? (
                                  <MDBBtn
                                    color="danger"
                                    onClick={() =>
                                      dispatch(
                                        removeUserDocs({
                                          email: userInfo.email,
                                          documents: userDocumentsSelected,
                                        })
                                      )
                                    }
                                  >
                                    Remove Document(s)
                                  </MDBBtn>
                                ) : null}
                              </MDBModalFooter>
                            </>
                          )}
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  </MDBContainer>
                ) : (
                  <MDBContainer>
                    <MDBCard
                      className={`p-4 ${darkMode ? " text-white bg-dark" : ""}`}
                    >
                      <MDBCardBody className="d-flex justify-content-center align-items-center flex-column">
                        <MDBCardTitle className="d-flex align-items-center">
                          <MDBIcon
                            fas
                            icon="user-circle"
                            size="2x"
                            className="mx-3"
                          />{" "}
                          Verify Your Account
                        </MDBCardTitle>

                        <MDBCardText className="text-center my-3">
                          {`Dear ${userInfo.username}, To upload your Docs, please verify your account first.
                          We'll send you a verification link to your email address to verify your account!`}
                        </MDBCardText>

                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : verify_link_error != null ||
                          verify_error != null ? (
                          <>
                            <div className="text-danger text-center mb-2 mx-2">
                              {verify_link_error || verify_error}{" "}
                              <i className="fas fa-exclamation-triangle text-danger"></i>
                            </div>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={verifyEmailHandler}
                            >
                              resend
                            </span>
                          </>
                        ) : verify_success ? (
                          <>
                            {verify_success.success}
                            <MDBIcon
                              fas
                              icon="check-double"
                              size="2x"
                              className="mx-2"
                              color="success"
                            />
                            <MDBBtn
                              className="btn-rounded my-2"
                              style={{
                                backgroundColor: darkMode
                                  ? "#455B8E"
                                  : "#A060FF",
                              }}
                              onClick={() => {
                                setAccountVerified(true);
                                navigate("/profile");
                              }}
                            >
                              Proceed
                            </MDBBtn>
                          </>
                        ) : verify_link_success ? (
                          <>
                            <div className="mt-2 text-center">
                              {verify_link_success.success}
                              <br />
                              <strong>{userInfo?.email}</strong>
                            </div>

                            <div className="mt-3 text-center text-muted">
                              Didn't receive the email?{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                onClick={verifyEmailHandler}
                              >
                                resend
                              </span>
                            </div>
                          </>
                        ) : (
                          <MDBBtn
                            className="btn-rounded"
                            style={{
                              backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                            }}
                            onClick={verifyEmailHandler}
                          >
                            Verify Email
                          </MDBBtn>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBContainer>
                )}
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab3"}>
                <MDBContainer>
                  <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={viewDocs}
                    config={{
                      header: {
                        disableHeader: false,
                        disableFileName: false,
                        retainURLParams: false,
                      },
                    }}
                    style={{ height: 500 }}
                  />
                </MDBContainer>
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab4"}>
                <MDBContainer>

                  {showComplaintDetails != null ?

                    <ComplaintDetails
                      showComplaintDetails={showComplaintDetails}
                      setShowComplaintDetails={setShowComplaintDetails} />

                    :
                    <>
                      {userInfo?.complaints?.length != 0 &&
                        <MDBTable align='middle' className="table">
                          <MDBTableHead>
                            <tr>
                              <th scope='col'>From</th>
                              <th scope='col'>To</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Actions</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {userInfo?.complaints?.map((complaintObj, index) => (
                              <tr key={index}>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <img
                                      src={
                                        complaintObj?.from?.image?.url
                                          ? complaintObj?.from?.image?.url
                                          : complaintObj?.from?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                      }
                                      alt="avatar"
                                      className="rounded-circle m-2"
                                      style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                      fluid
                                    />
                                    <div className='ms-3'>
                                      <p className='fw-bold mb-1'>{complaintObj?.from?.username}</p>
                                      {/* <p className='text-muted mb-0'>{complaintObj?.from?.email}</p> */}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className='d-flex align-items-center'>
                                    <img
                                      src={
                                        complaintObj?.to?.image?.url
                                          ? complaintObj?.to?.image?.url
                                          : complaintObj?.to?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                      }
                                      alt="avatar"
                                      className="rounded-circle m-2"
                                      style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                      fluid
                                    />
                                    <div className='ms-3'>
                                      <p className='fw-bold mb-1'>{complaintObj?.to?.username}</p>
                                      {/* <p className='text-muted mb-0'>{complaintObj?.to?.email}</p> */}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <MDBBadge color={complaintObj?.status == 'Resolved' ? 'success' : complaintObj?.status == 'Not Resolved' && 'warning'} pill>
                                    {complaintObj?.status}
                                  </MDBBadge>
                                </td>
                                <td>
                                  <MDBBtn color='link' rounded size='sm'
                                    onClick={() => setShowComplaintDetails(complaintObj)}>
                                    Details
                                  </MDBBtn>
                                </td>
                              </tr>

                            ))}
                          </MDBTableBody>
                        </MDBTable>
                      }


                      <div className="complaint_content">
                        <div className="commentsHeading">Write a Complaint</div>
                        <div className="contentSection">
                          <div className="secTopRow">
                            <input className="headingContentInput"
                              value={complaint.title}
                              onChange={(e) => {
                                setComplaint({ ...complaint, title: e.target.value })
                                setComplaintError('')
                              }}
                              placeholder={"Complaint Title"}
                            />
                          </div>

                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            From
                          </div>
                          <div className="">
                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                              <MDBCardImage
                                src={
                                  userInfo?.image?.url
                                    ? userInfo?.image?.url
                                    : userInfo?.gender == "female"
                                      ? femaleAvatar
                                      : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle my-3"
                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                fluid
                              />
                              <div className='ms-3 overflow-auto'>
                                <p className='fw-bold mb-1'>{userInfo?.user_type}</p>
                                <p className='fw-bold mb-1'>{userInfo?.username}</p>
                                <p className='mb-0' >{userInfo?.email}</p>
                              </div>
                            </MDBRipple>
                          </div>

                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            To
                          </div>
                          <div className="">
                            {option != null &&
                              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                <MDBCardImage
                                  src={
                                    option?.image?.url
                                      ? option?.image?.url
                                      : option?.gender == "female"
                                        ? femaleAvatar
                                        : maleAvatar
                                  }
                                  alt="avatar"
                                  className="rounded-circle my-3"
                                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                  fluid
                                />

                                <div className='ms-3 overflow-auto'>
                                  <p className='fw-bold mb-1'>{option.user_type}</p>
                                  <p className='fw-bold mb-1'>{option.username}</p>
                                </div>
                              </MDBRipple>
                            }

                            <div className={"userReviewRatingDropDown"}
                              onClick={() => setToggleDropdown(!toggleDropdown)}>
                              <div className={`userReviewRatingDropDownText ${toggleDropdown == false && 'selected'}`}>
                                {option == null ? 'user email' : option.email}
                              </div>
                            </div>

                            {toggleDropdown &&
                              <div className="dropdownRatingMenu">
                                {allUsers?.map((user, index) => {

                                  if (user.email != userInfo?.email) {

                                    return (

                                      <DropDownItem
                                        key={index}
                                        index={index + 1}
                                        onClick={() => {
                                          setToggleDropdown(!toggleDropdown);
                                          setOption(user);
                                          setComplaint({ ...complaint, to: user?._id })
                                          setComplaintError('')
                                        }}
                                        active={user.email == option?.email}

                                      >
                                        <div className={'optionData'}>
                                          <div className={'ratingOptionName'}>
                                            {user.email}
                                          </div>

                                        </div>
                                        {user.email == option?.email &&
                                          <img
                                            src={dropDownOptionSelected}
                                            alt={'dropDownOptionSelected'}
                                            style={{ width: "24px", height: "20px" }}
                                            className={'dropDownSelectedIcon'}
                                          />
                                        }

                                      </DropDownItem>
                                    )
                                  }


                                })}
                              </div>
                            }
                          </div>
                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            Details
                          </div>

                          <div className={"content_"}>

                            {complaint?.image?.url != null ?

                              <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${complaint?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                              }}>
                                <div className="topRowSectionImage">
                                  <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={changeSectionImage} />
                                  <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={removeSectionImage} />
                                </div>

                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElementComplaintImage}
                                  onChange={(e) => {
                                    setSelectedImageComplaint(e.target.files[0]);
                                    e.target.value = null;
                                  }}
                                />
                              </div>

                              :
                              <div className="contentImageContainer" onClick={changeSectionImage}>
                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElementComplaintImage}
                                  onChange={(e) => {
                                    setSelectedImageComplaint(e.target.files[0]);
                                    e.target.value = null;
                                  }}
                                  className="secInput"
                                />
                                + Add Screen Shot
                              </div>
                            }

                            {/* <img className="contentImage" src={content_?.img} /> */}
                            <textarea className="contentTextArea"
                              value={complaint?.text}
                              onChange={(e) => {
                                setComplaint({ ...complaint, text: e.target.value })
                                setComplaintError('')
                              }}
                              placeholder={"Complaint Text"}
                            />
                          </div>
                          <hr />
                        </div>

                        {(update_error || complaintError) && (
                          <div className="text-danger text-center mb-2">
                            {update_error || complaintError}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                          </div>)
                        }

                        {(update_success && complaintError == null) && (
                          <div className="text-success text-center mb-2">
                            {'Complaint has been posted successfully!'}{" "}
                            <i className="fas fa-exclamation-triangle text-success"></i>
                          </div>)
                        }

                        {
                          loading ?
                            <div className="my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">Loading...</span>
                              </MDBSpinner> </div> :
                            <MDBBtn
                              className="btn-rounded heroSecBtn-2"
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "4px"

                              }}
                              onClick={submitComplaint}
                            >
                              Submit Complaint
                            </MDBBtn>
                        }
                      </div>

                    </>

                  }

                </MDBContainer>
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab5"}>
                <MDBContainer>
                  {userInfo?.orders?.length != 0 ?
                    <MDBTable align='middle' className="table">
                      <MDBTableHead>
                        <tr>
                          <th scope='col'>ID</th>
                          <th scope='col'>Total</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {userInfo?.orders?.map((order, index) => (
                          <tr key={index}>
                            <td>
                              <p className='fw-bold mb-1'>{order?._id}</p>
                            </td>
                            <td>
                              <MDBBadge color={'success'} pill>
                                {order?.total} $
                              </MDBBadge>
                            </td>
                            <td>
                              <p className='mb-1'>{getDateTime(order?.createdAt).time + "  " + getDateTime(order?.createdAt).day}</p>
                            </td>
                            <td>
                              <MDBBadge color={order?.status == 'Delivered' ? 'success' : order?.status == 'Not Delivered' && 'warning'} pill>
                                {order?.status}
                              </MDBBadge>
                            </td>
                            <td>
                              <MDBBtn color='link' rounded size='sm'
                                onClick={() => navigate(`/order/${order?._id}`)}>
                                Details
                              </MDBBtn>
                            </td>
                          </tr>

                        ))}
                      </MDBTableBody>
                    </MDBTable> :
                    <p className='fw-bold mb-1'>You have no orders!</p>

                  }

                </MDBContainer>
              </MDBTabsPane>


              <MDBTabsPane show={verticalActive === "tab6"}>
                <MDBContainer>

                  {showComplaintDetails != null ?

                    <ComplaintDetails
                      showComplaintDetails={showComplaintDetails}
                      setShowComplaintDetails={setShowComplaintDetails} />

                    :
                    <>
                      {userInfo?.complaints?.length != 0 &&
                        <MDBTable align='middle' className="table">
                          <MDBTableHead>
                            <tr>
                              <th scope='col'>From</th>
                              <th scope='col'>To</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Actions</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {userInfo?.complaints?.map((complaintObj, index) => (
                              <tr key={index}>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <img
                                      src={
                                        complaintObj?.from?.image?.url
                                          ? complaintObj?.from?.image?.url
                                          : complaintObj?.from?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                      }
                                      alt="avatar"
                                      className="rounded-circle m-2"
                                      style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                      fluid
                                    />
                                    <div className='ms-3'>
                                      <p className='fw-bold mb-1'>{complaintObj?.from?.username}</p>
                                      {/* <p className='text-muted mb-0'>{complaintObj?.from?.email}</p> */}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className='d-flex align-items-center'>
                                    <img
                                      src={
                                        complaintObj?.to?.image?.url
                                          ? complaintObj?.to?.image?.url
                                          : complaintObj?.to?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                      }
                                      alt="avatar"
                                      className="rounded-circle m-2"
                                      style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                      fluid
                                    />
                                    <div className='ms-3'>
                                      <p className='fw-bold mb-1'>{complaintObj?.to?.username}</p>
                                      {/* <p className='text-muted mb-0'>{complaintObj?.to?.email}</p> */}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <MDBBadge color={complaintObj?.status == 'Resolved' ? 'success' : complaintObj?.status == 'Not Resolved' && 'warning'} pill>
                                    {complaintObj?.status}
                                  </MDBBadge>
                                </td>
                                <td>
                                  <MDBBtn color='link' rounded size='sm'
                                    onClick={() => setShowComplaintDetails(complaintObj)}>
                                    Details
                                  </MDBBtn>
                                </td>
                              </tr>

                            ))}
                          </MDBTableBody>
                        </MDBTable>
                      }


                      <div className="complaint_content">
                        <div className="commentsHeading">Write a Complaint</div>

                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                        />

                        <TimePicker
                          value={selectedTime}
                          onChange={handleTimeChange}
                          className="form-control"
                        />
                        
                        <div className="contentSection">
                          <div className="secTopRow">
                            <input className="headingContentInput"
                              value={complaint.title}
                              onChange={(e) => {
                                setComplaint({ ...complaint, title: e.target.value })
                                setComplaintError('')
                              }}
                              placeholder={"Complaint Title"}
                            />
                          </div>

                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            From
                          </div>
                          <div className="">
                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                              <MDBCardImage
                                src={
                                  userInfo?.image?.url
                                    ? userInfo?.image?.url
                                    : userInfo?.gender == "female"
                                      ? femaleAvatar
                                      : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle my-3"
                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                fluid
                              />
                              <div className='ms-3 overflow-auto'>
                                <p className='fw-bold mb-1'>{userInfo?.user_type}</p>
                                <p className='fw-bold mb-1'>{userInfo?.username}</p>
                                <p className='mb-0' >{userInfo?.email}</p>
                              </div>
                            </MDBRipple>
                          </div>

                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            To
                          </div>
                          <div className="">
                            {option != null &&
                              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                <MDBCardImage
                                  src={
                                    option?.image?.url
                                      ? option?.image?.url
                                      : option?.gender == "female"
                                        ? femaleAvatar
                                        : maleAvatar
                                  }
                                  alt="avatar"
                                  className="rounded-circle my-3"
                                  style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                  fluid
                                />

                                <div className='ms-3 overflow-auto'>
                                  <p className='fw-bold mb-1'>{option.user_type}</p>
                                  <p className='fw-bold mb-1'>{option.username}</p>
                                </div>
                              </MDBRipple>
                            }

                            <div className={"userReviewRatingDropDown"}
                              onClick={() => setToggleDropdown(!toggleDropdown)}>
                              <div className={`userReviewRatingDropDownText ${toggleDropdown == false && 'selected'}`}>
                                {option == null ? 'user email' : option.email}
                              </div>
                            </div>

                            {toggleDropdown &&
                              <div className="dropdownRatingMenu">
                                {allUsers?.map((user, index) => {

                                  if (user.email != userInfo?.email) {

                                    return (

                                      <DropDownItem
                                        key={index}
                                        index={index + 1}
                                        onClick={() => {
                                          setToggleDropdown(!toggleDropdown);
                                          setOption(user);
                                          setComplaint({ ...complaint, to: user?._id })
                                          setComplaintError('')
                                        }}
                                        active={user.email == option?.email}

                                      >
                                        <div className={'optionData'}>
                                          <div className={'ratingOptionName'}>
                                            {user.email}
                                          </div>

                                        </div>
                                        {user.email == option?.email &&
                                          <img
                                            src={dropDownOptionSelected}
                                            alt={'dropDownOptionSelected'}
                                            style={{ width: "24px", height: "20px" }}
                                            className={'dropDownSelectedIcon'}
                                          />
                                        }

                                      </DropDownItem>
                                    )
                                  }


                                })}
                              </div>
                            }
                          </div>
                          <div style={{
                            color: "wheat",
                            marginTop: "10px"
                          }}>
                            Details
                          </div>

                          <div className={"content_"}>

                            {complaint?.image?.url != null ?

                              <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${complaint?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                              }}>
                                <div className="topRowSectionImage">
                                  <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={changeSectionImage} />
                                  <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={removeSectionImage} />
                                </div>

                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElementComplaintImage}
                                  onChange={(e) => {
                                    setSelectedImageComplaint(e.target.files[0]);
                                    e.target.value = null;
                                  }}
                                />
                              </div>

                              :
                              <div className="contentImageContainer" onClick={changeSectionImage}>
                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElementComplaintImage}
                                  onChange={(e) => {
                                    setSelectedImageComplaint(e.target.files[0]);
                                    e.target.value = null;
                                  }}
                                  className="secInput"
                                />
                                + Add Screen Shot
                              </div>
                            }

                            {/* <img className="contentImage" src={content_?.img} /> */}
                            <textarea className="contentTextArea"
                              value={complaint?.text}
                              onChange={(e) => {
                                setComplaint({ ...complaint, text: e.target.value })
                                setComplaintError('')
                              }}
                              placeholder={"Complaint Text"}
                            />
                          </div>
                          <hr />
                        </div>

                        {(update_error || complaintError) && (
                          <div className="text-danger text-center mb-2">
                            {update_error || complaintError}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                          </div>)
                        }

                        {(update_success && complaintError == null) && (
                          <div className="text-success text-center mb-2">
                            {'Complaint has been posted successfully!'}{" "}
                            <i className="fas fa-exclamation-triangle text-success"></i>
                          </div>)
                        }

                        {
                          loading ?
                            <div className="my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">Loading...</span>
                              </MDBSpinner> </div> :
                            <MDBBtn
                              className="btn-rounded heroSecBtn-2"
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "4px"

                              }}
                              onClick={submitComplaint}
                            >
                              Submit Complaint
                            </MDBBtn>
                        }
                      </div>

                    </>

                  }

                </MDBContainer>
              </MDBTabsPane>

            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
}

export default Profile;

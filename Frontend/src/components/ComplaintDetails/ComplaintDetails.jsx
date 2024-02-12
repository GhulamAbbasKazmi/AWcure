import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './ComplaintDetails.css'

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
    MDBRipple
} from "mdb-react-ui-kit";


import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";

import {
    getUserDetails,
    updateUserDetails,
} from "../../features/user/userActions";

const ComplaintDetails = ({ showComplaintDetails, setShowComplaintDetails, darkMode }) => {

    const navigate = useNavigate();
    
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

    const [isOpen, setIsOpen] = useState(false);

    const [warningText, setWarningText] = useState("");

    const [basicModal, setBasicModal] = useState(false);

    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {

        const updatedUser = allUsers?.filter((user_) => user_._id == showComplaintDetails.from._id)[0]
        const updatedComplaint = updatedUser.complaints.filter((complaint_) => complaint_._id == showComplaintDetails._id)[0]
        setShowComplaintDetails(updatedComplaint);
        dispatch(getUserDetails())

    }, [allUsers]);


    const openDeleteModal = () => {
        setBasicModal(!basicModal);
        setDeleteMessage("");
    };

    const closeModalAfterDelete = () => {
        setBasicModal(!basicModal);
        if (delete_success) {
            navigate("/");
        }
    };

    return (
        <div
            className="ComplaintDetails_main"
        >
            <MDBBtn color='link' rounded size='sm' onClick={() => setShowComplaintDetails(null)}>Back to Complaints</MDBBtn>

            <div className="complaint_content my-3">
                <div className="commentsHeading">Complaint Details</div>
                <div style={{
                    color: "wheat",
                    marginTop: "10px"
                }}>
                    Status
                </div>
                <MDBBadge color={showComplaintDetails?.status == 'Resolved' ? 'success' : showComplaintDetails?.status == 'Not Resolved' && 'warning'} pill>
                    {showComplaintDetails?.status}
                </MDBBadge>

                <div className="contentSection">
                    <div className="secTopRow">
                        <div className="headingContentInput">
                            {showComplaintDetails?.title}
                        </div>
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
                                    showComplaintDetails?.from?.image?.url
                                        ? showComplaintDetails?.from?.image?.url
                                        : showComplaintDetails?.from?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle my-3"
                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                fluid
                            />
                            <div className='ms-3 overflow-auto'>
                                <p className='fw-bold mb-1'>{showComplaintDetails?.from?.user_type}</p>
                                <p className='fw-bold mb-1'>{showComplaintDetails?.from?.username}</p>
                                <p className='mb-0' >{showComplaintDetails?.from?.email}</p>
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
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            <MDBCardImage
                                src={
                                    showComplaintDetails?.to?.image?.url
                                        ? showComplaintDetails?.to?.image?.url
                                        : showComplaintDetails?.to?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle my-3"
                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                fluid
                            />
                            <div className='ms-3 overflow-auto'>
                                <p className='fw-bold mb-1'>{showComplaintDetails?.to?.user_type}</p>
                                <p className='fw-bold mb-1'>{showComplaintDetails?.to?.username}</p>
                                <p className='mb-0' >{showComplaintDetails?.to?.email}</p>
                            </div>
                        </MDBRipple>
                    </div>


                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Details
                    </div>

                    <div className={"content_"}>

                        {showComplaintDetails?.image?.url != null &&

                            <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${showComplaintDetails?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                            </div>
                        }

                        {/* <img className="contentImage" src={content_?.img} /> */}
                        <div className="contentTextArea">
                            {showComplaintDetails?.text}
                        </div>
                    </div>
                    <hr />

                    {userInfo?.user_type == 'admin' &&
                        <>
                            <div className="commentsHeading">Send warning to
                            </div>
                            <div style={{
                                color: "wheat",
                                marginTop: "10px",
                                marginBottom: "5px"
                            }}>
                                {showComplaintDetails?.to?.email}
                            </div>
                            <div className="warningTextWrite">
                                <div className="commentInput">
                                    <textarea className="contentTextArea"
                                        value={warningText}
                                        onChange={(e) => setWarningText(e.target.value)}
                                        placeholder={"Warning Text"}
                                    />
                                </div>
                                <div className="postComment">
                                    {loading ?
                                        <div className="my-3">
                                            <MDBSpinner color="primary">
                                                <span className="visually-hidden">Loading...</span>
                                            </MDBSpinner> </div>
                                        :
                                        <MDBBtn className='me-1' color='primary' onClick={() => warningText != "" && dispatch(updateUserDetails({ email: showComplaintDetails?.to?.email, warning: warningText, admin_email: userInfo?.email }))}>
                                            Post Warning {" "}<MDBIcon fas icon="pencil-alt" />
                                        </MDBBtn>}
                                </div>
                            </div>
                            {
                                loading ?
                                    <div className="my-3">
                                        <MDBSpinner color="primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </MDBSpinner> </div>
                                    :
                                    <MDBCard
                                        className={`my-3 ${darkMode ? " text-white bg-dark" : ""}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-center m-4 profileButtons">
                                            <MDBCol className="flex-2 mx-1">
                                                <MDBBtn
                                                    color={showComplaintDetails?.status == 'Not Resolved' ? 'success' : 'warning'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#455B8E" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={() => dispatch(updateUserDetails({ email: showComplaintDetails?.from?.email, complaintId: showComplaintDetails._id, complaintStatus: showComplaintDetails?.status == 'Not Resolved' ? true : false, admin_email: userInfo?.email }))}

                                                >
                                                    Mark as {showComplaintDetails?.status == 'Resolved' ? 'Not Resolved' : 'Resolved'}
                                                </MDBBtn>
                                            </MDBCol>

                                            <MDBCol className="flex-2 mx-1">
                                                <MDBBtn
                                                    color={showComplaintDetails?.to?.status == 'Blocked' ? 'warning' : 'danger'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#581845" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={openDeleteModal}
                                                >
                                                    {showComplaintDetails?.to?.status == 'Blocked' ? 'Unblock' : 'Block'} Account
                                                </MDBBtn>
                                            </MDBCol>
                                        </div>
                                    </MDBCard>

                            }

                        </>
                    }

                </div>
            </div>

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
                                Account Setting{" "}
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
                                        : `Are you sure to ${showComplaintDetails?.to?.status == 'Blocked' ? 'Unblock ' : 'Block '} your account? `}
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
                                            color={showComplaintDetails?.to?.status == 'Blocked' ? 'warning' : 'danger'}
                                            onClick={() => dispatch(updateUserDetails({ email: showComplaintDetails?.to?.email, block: showComplaintDetails?.to?.status == 'Blocked' ? false : true, admin_email: userInfo?.email }))}
                                        >
                                            {showComplaintDetails?.to?.status == 'Blocked' ? 'Unblock ' : 'Block '} Account
                                        </MDBBtn>
                                    ) : null}
                                </MDBModalFooter>
                            </>
                        )}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
}

export default ComplaintDetails;
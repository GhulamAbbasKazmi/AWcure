import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './DrugDetails.css'

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


import drugImage from "../../assets/3d-blue-pill-package.png";

import { getDrug, postDrug, updateDrug, deleteDrug } from "../../features/drug/drugActions";
import { addToCart } from "../../features/user/userSlice";

const DrugDetails = ({ showDrugDetails, setShowDrugDetails, darkMode }) => {

    const dispatch = useDispatch();

    const {
        userInfo,cart
    } = useSelector((state) => state.user);

    const {
        loading,
        drugs,
        drug,
        error,
        success,
    } = useSelector((state) => state.drug);
    

    const [cartItemCount, setCartItemCount] = useState(0);

    const inputElementDrugImage = useRef();

    const [newDrug, setNewDrug] = useState({
        title: "",
        image: { imageToBase64: null, url: null },
        price: null,
        description: ""
    });

    const [drugError, setDrugError] = useState('')


    const [selectedImageDrug, setSelectedImageDrug] = useState(null);

    const [basicModal, setBasicModal] = useState(false);
    const [basicModalUpdate, setBasicModalUpdate] = useState(false);

    const [updateMessage, setUpdateMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {

        if (showDrugDetails._id) {
            dispatch(getDrug({ id: showDrugDetails._id }))
        }
        
    }, []);

    useEffect(() => {
        if (showDrugDetails._id) {
            setNewDrug(drug)
            setCartItemCount(0)
        }
    }, [drug]);


    useEffect(() => {
        if (selectedImageDrug) {

            const reader = new FileReader();
            reader.readAsDataURL(selectedImageDrug);
            reader.onloadend = () => {
                setNewDrug({ ...newDrug, image: { ...newDrug.image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImageDrug) } })
            };
        }
    }, [selectedImageDrug]);

    useEffect(() => {
        if (success == 'Drug has been posted successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Drug has been updated successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Drug has been delete successfully!') {
            setUpdateMessage(success);
        }
        if (error) {
            setUpdateMessage(error);
        }
    }, [success, error]);


    useEffect(() => {

        let item_ = cart.find(item => item.id == drug?._id)
        if (item_) {
            setCartItemCount(item_.quantity)
        }

    }, [cart,drug]);

    const changeDrugImage = () => {
        inputElementDrugImage.current.click();
    };

    const removeDrugImage = () => {
        setSelectedImageDrug(null);
        setNewDrug({ ...newDrug, image: { ...newDrug.image, imageToBase64: null, url: null } })
    };


    const openUpdateModal = () => {
        setBasicModalUpdate(!basicModalUpdate);
        setUpdateMessage("");
    };

    const closeModalAfterUpdate = () => {
        setBasicModalUpdate(!basicModalUpdate);
    };

    const openDeleteModal = () => {
        setBasicModal(!basicModal);
        setDeleteMessage("");
    };
    const closeModalAfterDelete = () => {
        setBasicModal(!basicModal);
        setShowDrugDetails(null)
    };

    const submitNewDrug = () => {

        console.log('submitting')

        if (newDrug.title == "") {
            setDrugError('Drug title is empty!')
        }
        // else if (newDrug.image.url == null) {
        //     setDrugError('Drug Image is not selected!')
        // }

        else if (newDrug.price == null) {
            setDrugError('Drug price is empty!')
        }

        else if (newDrug.description == "") {
            setDrugError('Drug description is empty!')
        }
        else {
            setDrugError(null)
            dispatch(postDrug({ admin_email: userInfo?.email, drug: newDrug }))
        }
    }

    return (
        <div
            className="ComplaintDetails_main"
        >
            <MDBBtn color='link' rounded size='sm' onClick={() => setShowDrugDetails(null)}>Back to Drugs</MDBBtn>

            <div className="complaint_content my-3">
                <div className="commentsHeading">Drug Details</div>

                <div className="contentSection">
                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Title
                    </div>
                    <div className="secTopRow">

                        {userInfo?.user_type == 'admin' ?
                            <input className="headingContentInput"
                                value={newDrug?.title}
                                onChange={(e) => {
                                    setNewDrug({ ...newDrug, title: e.target.value })
                                    setDrugError('')
                                }}
                                placeholder={"Drug Title"}
                            />
                            :
                            <div className="headingContentInput">
                                {newDrug?.title}
                            </div>
                        }

                    </div>

                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Price
                    </div>

                    {userInfo?.user_type == 'admin' ?
                        <input className="headingContentInput"
                            value={newDrug?.price}
                            type="number"
                            onChange={(e) => {
                                setNewDrug({ ...newDrug, price: e.target.value })
                                setDrugError('')
                            }}
                            placeholder={"Drug Price $"}
                        /> :
                        <MDBBadge color={'success'} pill>
                            {newDrug?.price}
                        </MDBBadge>
                    }

                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Details
                    </div>

                    <div className={"content_"}>

                        {newDrug?.image?.url != null && userInfo?.user_type == 'admin' ?

                            <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${newDrug?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <div className="topRowSectionImage">
                                    <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={changeDrugImage} />
                                    <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={removeDrugImage} />
                                </div>

                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    ref={inputElementDrugImage}
                                    onChange={(e) => {
                                        setSelectedImageDrug(e.target.files[0]);
                                        e.target.value = null;
                                    }}
                                />
                            </div>

                            : userInfo?.user_type == 'admin' ?
                                <div className="contentImageContainer" onClick={changeDrugImage}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{ display: "none" }}
                                        ref={inputElementDrugImage}
                                        onChange={(e) => {
                                            setSelectedImageDrug(e.target.files[0]);
                                            e.target.value = null;
                                        }}
                                        className="secInput"
                                    />
                                    + Add Drug Image
                                </div>

                                :
                                <div className="contentImageContainer_Image" style={{
                                    backgroundImage: `url(${newDrug?.image?.url
                                        ? newDrug?.image?.url
                                        : drugImage})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}>
                                </div>
                        }

                        {userInfo?.user_type == 'admin' ?
                            <textarea className="contentTextArea"
                                value={newDrug?.description}
                                onChange={(e) => {
                                    setNewDrug({ ...newDrug, description: e.target.value })
                                    setDrugError('')
                                }}
                                placeholder={"Drug Description"}
                            /> :
                            <div className="contentTextArea">
                                {newDrug?.description}
                            </div>
                        }

                    </div>
                    <hr />
                    {userInfo?.user_type == 'admin' && (showDrugDetails._id != null) &&  
                        <>
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
                                                    color={'success'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#455B8E" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={openUpdateModal}
                                                >
                                                    Update Drug
                                                </MDBBtn>
                                            </MDBCol>

                                            <MDBCol className="flex-2 mx-1">
                                                <MDBBtn
                                                    color={'danger'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#581845" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={openDeleteModal}
                                                >
                                                    Delete Drug
                                                </MDBBtn>
                                            </MDBCol>
                                        </div>
                                    </MDBCard>

                            }

                        </>

                    }

                    {(error || drugError) && (
                        <div className="text-danger text-center mb-2">
                            {error || drugError}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                        </div>)
                    }

                    {(success && drugError == null) && (
                        <div className="text-success text-center mb-2">
                            {updateMessage }{" "}
                            <i className="fas fa-exclamation-triangle text-success"></i>
                        </div>)
                    }
                    {
                        loading ?
                            <div className="my-3">
                                <MDBSpinner color="primary">
                                    <span className="visually-hidden">Loading...</span>
                                </MDBSpinner> </div> : userInfo?.user_type == 'admin' && showDrugDetails._id == null &&
                            <MDBBtn
                                className="btn-rounded heroSecBtn-2"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "4px"

                                }}
                                onClick={submitNewDrug}
                            >
                                Post Drug
                            </MDBBtn>
                    }
                    {userInfo?.user_type != 'admin' &&
                        <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px"

                        }}
                        onClick={()=> dispatch(addToCart({ id: drug._id, amount: drug.price, cart }))}
                    >
                        Add to Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
                    </MDBBtn>
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
                                Delete Drug{" "}
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
                                    {updateMessage != ""
                                        ? updateMessage
                                        : "Are you sure to remove the drug? "}
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn
                                        color="secondary"
                                        onClick={closeModalAfterDelete}
                                    >
                                        Close
                                    </MDBBtn>

                                    {updateMessage == "" ? (
                                        <MDBBtn
                                            color="danger"
                                            onClick={() => dispatch(deleteDrug({ admin_email: userInfo?.email, drug: newDrug }))}
                                        >
                                            Delete Drug
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
                                Update Drug{" "}
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
                                        : "Are you sure to update the drug? "}
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
                                            onClick={() => dispatch(updateDrug({ drug: newDrug, admin_email: userInfo?.email }))}
                                        >
                                            Update Drug
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

export default DrugDetails;
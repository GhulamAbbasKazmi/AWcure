import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useNavigate, useParams } from "react-router-dom";

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
} from "mdb-react-ui-kit";

import './Dashboard.css'
import Users from "../../../components/Admin/Users/Users";
import Complaints from "../../../components/Admin/Complaints/Complaints";
import Pharmacy from "../../../components/Admin/Pharmacy/Pharmacy";
import UserProfile from "../../../components/Admin/UserProfile/UserProfile";
import Orders from "../../../components/Admin/Orders/Orders";

export default function Dashboard({ darkMode }) {


    const location = useLocation();
    const state = location.state;

    const [verticalActive, setVerticalActive] = useState("tab1");
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (state?.tab) {
            setVerticalActive(state?.tab);
        }
    }, [state]);

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };




    console.log('showUserProfile', showUserProfile)
    return (
        <div className="Dashboard_main">
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
                Admin Dashboard
            </p>
            <div className={`DashboardForm mb-6`}>
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
                                    Users
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink
                                    onClick={() => handleVerticalClick("tab2")}
                                    active={verticalActive === "tab2"}
                                >
                                    Complaints
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink
                                    onClick={() => handleVerticalClick("tab3")}
                                    active={verticalActive === "tab3"}
                                >
                                    Pharmacy
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink
                                    onClick={() => handleVerticalClick("tab4")}
                                    active={verticalActive === "tab4"}
                                >
                                    Orders
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>
                    </MDBCol>

                    <MDBCol md="9">
                        <MDBTabsContent>
                            <MDBTabsPane className="usersTab" show={verticalActive === "tab1"}>
                                {showUserProfile ? <UserProfile user={user} setUser={setUser} setShowUserProfile={setShowUserProfile} /> : <Users setShowUserProfile={setShowUserProfile} setUser={setUser} />}
                            </MDBTabsPane>

                            <MDBTabsPane show={verticalActive === "tab2"}>
                                <MDBContainer>
                                    <Complaints />
                                </MDBContainer>
                            </MDBTabsPane>

                            <MDBTabsPane show={verticalActive === "tab3"}>
                                <MDBContainer>
                                    <Pharmacy />
                                </MDBContainer>
                            </MDBTabsPane>
                            <MDBTabsPane show={verticalActive === "tab4"}>
                                <MDBContainer>
                                    <Orders />
                                </MDBContainer>
                            </MDBTabsPane>
                        </MDBTabsContent>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}

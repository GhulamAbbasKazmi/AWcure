import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../features/user/userActions";
import { logout } from "../../features/user/userSlice";
import "./header.css";
import logo from "../../assets/logo-dark.png";
import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";
import cartIcon from "../../assets/cartIcon.svg";

import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBCol,
  MDBRow,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Header = () => {
  const { userInfo, userToken, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [cartItems, setCartItems] = useState(0);

  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  useEffect(() => {

    let totalItems = cart.reduce((acc,item) => acc + item.quantity, 0)
   
    setCartItems(totalItems)

}, [cart]);

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <>
      {userInfo?.status == 'Warned' && <div className="topBar">
        You have been warned! Check your &nbsp;<span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/profile")}> profile</span>&nbsp; for details
      </div>}

      <MDBNavbar expand="lg" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <NavLink to="/">
              <img className="logo" src={logo} />
            </NavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <div className="nav-container">
              <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                <NavLink to="/">
                  {({ isActive }) => (
                    <MDBNavbarItem
                      className={isActive ? "activeClassName" : undefined}
                    >
                      <MDBNavbarLink aria-current="page">{userInfo?.user_type == 'admin' ? 'Dashboad' : 'Home'}</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </NavLink>

                <NavLink to="/profile">
                  {({ isActive }) => (
                    <MDBNavbarItem
                      className={isActive ? "activeClassName" : undefined}
                    >
                      <MDBNavbarLink aria-current="page">Profile</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </NavLink>

                <NavLink to="/blog">
                  {({ isActive }) => (
                    <MDBNavbarItem
                      className={isActive ? "activeClassName" : undefined}
                    >
                      <MDBNavbarLink aria-current="page">Blog</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </NavLink>

                {
                  userInfo != null &&
                  <>
                    <NavLink to="/pharmacy">
                      {({ isActive }) => (
                        <MDBNavbarItem
                          className={isActive ? "activeClassName" : undefined}
                        >
                          <MDBNavbarLink aria-current="page">Pharmacy</MDBNavbarLink>
                        </MDBNavbarItem>
                      )}
                    </NavLink>

                    <NavLink to="/joinChat">
                      {({ isActive }) => (
                        <MDBNavbarItem
                          className={isActive ? "activeClassName" : undefined}
                        >
                          <MDBNavbarLink aria-current="page">Chat</MDBNavbarLink>
                        </MDBNavbarItem>
                      )}
                    </NavLink>
                  </>
                }

                <NavLink to="/about">
                  {({ isActive }) => (
                    <MDBNavbarItem
                      className={isActive ? "activeClassName" : undefined}
                    >
                      <MDBNavbarLink aria-current="page">About</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </NavLink>
              </MDBNavbarNav>
            </div>

            <div className="d-flex justify-content-center align-items-center p-3 login-status-container">
              <span className="text-light m-2 header-login-status">
                {userInfo
                  ? `Logged in as ${userInfo.email}`
                  : "You're not logged in"}
              </span>
              {userInfo ? (
                <div className="header-btns">
                  <MDBCardImage
                    src={
                      userInfo?.image?.url
                        ? userInfo?.image?.url
                        : userInfo.gender == "female"
                          ? femaleAvatar
                          : maleAvatar
                    }
                    alt="avatar"
                    className="rounded-circle m-2"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    fluid
                  />
                  <button className="button" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="header-btns">
                  <NavLink className="button m-1" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="button m-1" to="/register">
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
            {userInfo != null && 
              <div style={{cursor:"pointer"}} onClick={()=>navigate("/checkout")}>
                  <div className='cartText'>{cartItems} Drugs</div>
                  <img
                  src={cartIcon}
                  alt="cartIcon"
                  className='cartIcon'
                />
              </div>
            }



          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;

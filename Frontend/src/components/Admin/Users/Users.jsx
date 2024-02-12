import React, { useState, useEffect } from "react";
import './Users.css'
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBSpinner
} from 'mdb-react-ui-kit';

import useWindowSize from "../../../utils/useWindowSize";

import { getAllUsers } from "../../../features/user/userActions";

import femaleAvatar from "../../../assets/female-avatar-3.png";
import maleAvatar from "../../../assets/male-avatar-1.png";

const Users = ({ setShowUserProfile, setUser }) => {

  const { width, height } = useWindowSize();
  const { allUsers, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers({}))
  }, []);


  console.log('all users', allUsers)
  return (
    <div
      className="Users_main"
    >
      {
        loading ?
          <div className="my-3">
            <MDBSpinner color="primary">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner> </div>
          :

          width > 600 ?
            <MDBTable align='middle' className="table">
              <MDBTableHead>
                <tr>
                  <th scope='col'>User</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {allUsers?.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={
                            user?.image?.url
                              ? user?.image?.url
                              : user?.gender == "female"
                                ? femaleAvatar
                                : maleAvatar
                          }
                          alt="avatar"
                          className="rounded-circle m-2"
                          style={{ width: "45px", height: "45px", objectFit: "cover" }}
                          fluid
                        />
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{user?.username}</p>
                          <p className='text-muted mb-0'>{user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>{user.user_type}</p>
                    </td>
                    <td>
                      <MDBBadge color={user?.status == 'Active' ? 'success': user?.status == 'Warned' ? 'warning' : 'danger'} pill>
                        {user?.status}
                      </MDBBadge>
                    </td>
                    <td>{user?.gender}</td>
                    <td>
                      <MDBBtn color='link' rounded size='sm' onClick={() => {
                        setUser(user)
                        setShowUserProfile(true)
                      }}>
                        Edit
                      </MDBBtn>
                    </td>
                  </tr>

                ))}
              </MDBTableBody>
            </MDBTable>
            :
            <div className="cardsContainer" >
              {allUsers?.map((user, index) => (
                <MDBCard key={index} className="card_User">
                  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage
                      src={
                        user?.image?.url
                          ? user?.image?.url
                          : user?.gender == "female"
                            ? femaleAvatar
                            : maleAvatar
                      }
                      alt="avatar"
                      className="rounded-circle my-3"
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      fluid
                    />
                    <div className='ms-3 overflow-auto'>
                      <p className='fw-bold mb-1'>{user?.username}</p>
                      <p className='text-muted mb-0'>{user?.email}</p>
                    </div>
                  </MDBRipple>
                  <MDBCardBody className="d-flex align-items-center justify-content-between flex-column px-2">
                    <div className="h5 d-flex align-items-center justify-content-between w-100"> <div>Type </div> <div className="fw-bold">{user.user_type}</div></div>
                    <div className="h5 d-flex align-items-center justify-content-between w-100"><div>Status</div><MDBBadge color='success' pill>
                      {user?.status}
                    </MDBBadge></div>
                    <div className="h5 d-flex align-items-center justify-content-between w-100"><div>Gender</div><span className="fw-bold">{user?.gender}</span></div>
                    <MDBBtn color='link' rounded size='sm' onClick={() => setShowUserProfile(true)}>
                      Edit
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </div>
      }
    </div>
  );
}

export default Users;
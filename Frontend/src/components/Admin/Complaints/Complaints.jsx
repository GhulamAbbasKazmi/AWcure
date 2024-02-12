import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Complaints.css'
import ComplaintDetails from "../../ComplaintDetails/ComplaintDetails";


import {
    MDBBtn,
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";


import femaleAvatar from "../../../assets/female-avatar-3.png";
import maleAvatar from "../../../assets/male-avatar-1.png";

const Complaints = () => {


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

    const [isOpen, setIsOpen] = useState(false);

    const [allComplaints, setAllComplaints] = useState([]);

    const [showComplaintDetails, setShowComplaintDetails] = useState(null);

    useEffect(() => {
        if(allUsers){
            let complaints = []
            allUsers?.map(user=> {
                user.complaints.map((complaint)=>{
                    complaints.push(complaint)
                })
                return user
                })
            setAllComplaints(complaints)
        }

    }, [allUsers]);


    return (
        <div
            className="Complaints_main"
        >
            {showComplaintDetails != null ?

                <ComplaintDetails
                    showComplaintDetails={showComplaintDetails}
                    setShowComplaintDetails={setShowComplaintDetails} />

                : allComplaints?.length != 0 &&
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
                        {allComplaints?.map((complaintObj, index) => (
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
        </div>
    );
}

export default Complaints;
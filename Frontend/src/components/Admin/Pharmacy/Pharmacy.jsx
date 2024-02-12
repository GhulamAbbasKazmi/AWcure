import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Pharmacy.css'
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

import { getDrugs, postDrug } from "../../../features/drug/drugActions";
import DrugDetails from "../../DrugDetails/DrugDetails";

import drugImage from "../../../assets/3d-blue-pill-package.png";

const Pharmacy = () => {
    const {
        loading,
        drugs,
        drug,
        error,
        success,
    } = useSelector((state) => state.drug);

    const dispatch = useDispatch();

    const [showDrugDetails, setShowDrugDetails] = useState(null);

    useEffect(() => {
        dispatch(getDrugs({}))
    }, [drug]);


    return (
        <div
            className="Pharmacy_main"
        >
            {showDrugDetails != null ?

                <DrugDetails
                    showDrugDetails={showDrugDetails}
                    setShowDrugDetails={setShowDrugDetails} />

                :
                <>
                  <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px"

                        }}
                        onClick={()=>setShowDrugDetails({})}
                    >
                        Create new Drug
                    </MDBBtn>

                    {drugs?.length != 0 &&
                        <MDBTable align='middle' className="table">
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {drugs?.map((drugObj, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={
                                                        drugObj.image?.url
                                                            ? drugObj.image?.url
                                                            : drugImage
                                                    }
                                                    alt="avatar"
                                                    className="rounded-circle m-2"
                                                    style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                                    fluid
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{drugObj?.title}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <MDBBadge color={'success'} pill>
                                                {drugObj?.price} $
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBtn color='link' rounded size='sm'
                                                onClick={() => setShowDrugDetails(drugObj)}>
                                                Details
                                            </MDBBtn>
                                        </td>
                                    </tr>

                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    }
                </>
            }
        </div>
    );
}

export default Pharmacy;
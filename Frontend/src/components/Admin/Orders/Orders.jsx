import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Orders.css'
import { useNavigate } from "react-router-dom";

import {
    MDBBtn,
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";


import femaleAvatar from "../../../assets/female-avatar-3.png";
import maleAvatar from "../../../assets/male-avatar-1.png";

const Orders = () => {

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

    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        if(allUsers){
            let allOrders_ = []
            allUsers?.map(user=> {
                user.orders.map((order)=>{
                    allOrders_.push(order)
                })
                return user
                })
            setAllOrders(allOrders_)
        }

    }, [allUsers]);


    const getDateTime = (date_) => {
        const date = new Date(Date.parse(date_))
        const day = date.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })
        const time = [date.getHours(), date.getMinutes(),].join(':')
    
        return { day, time }
      }

    return (
        <div
            className="Complaints_main"
        >
             {allOrders?.length != 0 ?
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
                        {allOrders?.map((order, index) => (
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
                    <p className='fw-bold mb-1'>No orders found!</p>

                  }
          
        </div>
    );
}

export default Orders;
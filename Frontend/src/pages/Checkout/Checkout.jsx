import { useState, useEffect } from "react";
import './Checkout.css'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/user/userSlice";

import { getDrugs } from "../../features/drug/drugActions";

import drugImage from "../../assets/3d-blue-pill-package.png";

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";

import {
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
    MDBSpinner, MDBRadio
} from 'mdb-react-ui-kit';
import { updateUserDetails } from "../../features/user/userActions";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const [newOrder, setNewOrder] = useState(null);

    const {
        userInfo, cart, success, error
    } = useSelector((state) => state.user);

    const {
        loading,
        drugs,
        drug,
    } = useSelector((state) => state.drug);

    useEffect(() => {
        dispatch(getDrugs({}))
    }, []);


    useEffect(() => {
        let totalPrice = cart.reduce((acc, item) => acc + item.amount, 0)
        setTotalPrice(totalPrice)
        setNewOrder({
            user: userInfo?.id && userInfo?.id || userInfo?._id && userInfo?._id,
            paymentMethod: "Paypal",
            orderItems: cart,
            total: Number((totalPrice + (totalPrice * 0.15)).toFixed(2)),
        })

    }, [cart]);

    useEffect(() => {
        if(checkout == true){

            let order_ = userInfo?.orders[userInfo?.orders.length - 1]
            if (order_) {
                navigate(`/order/${order_._id}`);
            }

        }


    }, [userInfo?.orders]);

    const submitPlaceOrder = () => {

        console.log('paying...')
        dispatch(updateUserDetails({ email: userInfo?.email, order: newOrder }))
    }
    
    console.log('newOrder...', newOrder)
    return (
        <div className="checkout-main" >
            <p
                style={{
                    fontSize: "4rem",
                    marginTop: "2rem",
                    fontWeight: "bolder",
                    fontFamily: "sans-serif",
                    textShadow:
                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
            >
                {!checkout ? 'Cart' : 'Checkout'}
            </p>

            <div className="mainContainerCheckout" >

                <div className="mainPanelCheckout" >

                    {checkout &&
                        <>
                            <div style={{
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "26px",
                                marginTop: "10px"
                            }}>
                                User
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
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "26px",
                                marginTop: "10px"
                            }}>
                                Payment Method
                            </div>
                            <div>
                                <MDBRadio defaultChecked name='Payment' id='inlineRadio1' value='Paypal' label='Paypal' inline 
                                onChange={(e)=> setNewOrder({...newOrder, paymentMethod: e.target.value})} />
                                <MDBRadio name='Payment' id='inlineRadio2' value='Stripe' label='Stripe' inline  
                                 onChange={(e)=> setNewOrder({...newOrder, paymentMethod: e.target.value})} />
                            </div>

                            <div style={{
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "26px",
                                marginTop: "10px"
                            }}>
                                OrderItems
                            </div>
                        </>

                    }

                    {cart?.length != 0 ?
                        <MDBTable align='middle' className="table">
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'>Total Amount</th>
                                    {!checkout && <th scope='col'>Remove</th>}
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {cart?.map((itemObj, index) => {

                                    let drugObj = drugs.find((drug) => drug._id == itemObj.id)

                                    return (<tr key={index}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={
                                                        drugObj?.image?.url
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
                                            <p className='fw-bold mb-1'>{itemObj?.quantity}</p>
                                        </td>
                                        <td>
                                            <MDBBadge color={'success'} pill>
                                                {itemObj?.amount} $
                                            </MDBBadge>
                                        </td>

                                        {!checkout &&

                                            <td>
                                                <MDBIcon className="secDelIcon" far icon="trash-alt"

                                                    onClick={() => dispatch(removeFromCart({ id: itemObj.id, amount: drugObj.price }))} />

                                            </td>
                                        }

                                    </tr>)

                                })}
                            </MDBTableBody>
                        </MDBTable> : 'Cart is empty'
                    }
                </div>

                {cart?.length != 0 &&
                    <div className="sidePanelCheckout" >

                        {checkout && <div style={{
                            color: "black",
                            fontWeight: "bolder",
                            fontSize: "26px",
                            marginTop: "10px"
                        }}>
                            Order Summary
                        </div>}
                        <MDBCardText className="my-1">
                            Total Price : {totalPrice}
                        </MDBCardText>
                        <MDBCardText className="my-1">
                            Tax Price : {(totalPrice * 0.15).toFixed(2)}
                        </MDBCardText>
                        <MDBCardTitle className="fw-bold">
                            Sub Total : {(totalPrice + (totalPrice * 0.15)).toFixed(2)}
                        </MDBCardTitle>

                        {!checkout ?

                            <MDBBtn
                                className="btn-rounded heroSecBtn-1"
                                style={{
                                    width: "100%",
                                }}
                                onClick={() => setCheckout(true)}
                            >
                                Proceed to Checkout
                            </MDBBtn>
                            :
                            <MDBBtn
                                className="btn-rounded heroSecBtn-2"
                                style={{
                                    width: "100%",
                                }}
                                onClick={submitPlaceOrder}
                            >
                                Place Order
                            </MDBBtn>

                        }
                    </div>}


            </div>
        </div>
    )
}

export default Checkout;
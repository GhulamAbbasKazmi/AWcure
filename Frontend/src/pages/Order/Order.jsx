import { useState, useEffect } from "react";
import './Order.css'
import CheckoutFormStripe from './CheckoutFormStripe'
import { useNavigate, useParams, useLocation, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/user/userSlice";
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import drugImage from "../../assets/3d-blue-pill-package.png";
import { getDrugs } from "../../features/drug/drugActions";

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
    MDBRow,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
    MDBSpinner,
    MDBModal,
    MDBModalBody,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { updateUserDetails } from "../../features/user/userActions";


// const host = "http://localhost:5000";

const Order = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        userInfo, cart, allUsers, update_success, update_error
    } = useSelector((state) => state.user);

    const {
        loading,
        drugs,
        drug,
        error,
        success,
    } = useSelector((state) => state.drug);


    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const [basicModal, setBasicModal] = useState(false);
    const [basicModalUpdate, setBasicModalUpdate] = useState(false);

    const [updateMessage, setUpdateMessage] = useState("");
    const [sdkReady, setSdkReady] = useState(false);

    const [stripePromise, setStripePromise] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        dispatch(getDrugs({}))
    }, []);

    useEffect(() => {

        if (order?.paymentMethod == 'Paypal') {
            const addPaypalScript = async () => {
                const { data: clientId } = await axios.get(`/api/config/paypal`)
                const script = document.createElement('script')
                script.type = 'type/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                setSdkReady(true)
                // script.onload = () => {
                //     setSdkReady(true)
                // }
                document.body.appendChild(script)
            }

            if (!order?.isPaid) {
                if (!window.paypal) {
                    addPaypalScript()
                }
                else {
                    setSdkReady(true)
                }
            }
        } else {
            const getPublishableKey = async () => {
                const { data } = await axios.get(`/api/config/stripe`)
                setStripePromise(loadStripe(data.publishableKey))
            }
            if (stripePromise == false) {
                getPublishableKey()
            }

            const getPaymentIntentClientSecret = async () => {
                try {

                    const { data: clientSecret } = await axios.post(`/api/create-payment-intent`, { amount: Math.round(order?.total * 100), currency: "USD" })
                    setClientSecret(clientSecret)

                } catch (error) {
                    if (error.response && error.response.data.message) {
                        return (error.response.data.message);
                    } else {
                        return (error.message);
                    }
                }

            }
            if (clientSecret == "") {
                getPaymentIntentClientSecret()
            }
        }

    }, [order]);



    useEffect(() => {

        if (userInfo?.user_type != 'admin') {

            let order_ = userInfo?.orders?.find((order) => order._id == id)
            if (order_) {
                setOrder(order_)
                let totalPrice = order_.orderItems?.reduce((acc, item) => acc + item.amount, 0)
                setTotalPrice(totalPrice)
            }

        }
        else {

            allUsers?.map(user => {
                let order_ = user.orders.find((order) => order._id == id)
                if (order_) {
                    setOrder(order_)
                    let totalPrice = order_.orderItems?.reduce((acc, item) => acc + item.amount, 0)
                    setTotalPrice(totalPrice)
                }
                return user
            })
        }


    }, [userInfo, allUsers]);

    useEffect(() => {
        if (update_success && basicModalUpdate) {
            setUpdateMessage("Updated Successfully!");
        }
        if (update_success && basicModal) {
            setUpdateMessage("Removed Successfully!");
        }
        if (update_error) {
            setUpdateMessage(update_error);
        }
    }, [update_success, update_error]);


    const openUpdateModal = () => {
        setBasicModalUpdate(!basicModalUpdate);
        setUpdateMessage("");
    };

    const openDeleteModal = () => {
        setBasicModal(!basicModal);
        setUpdateMessage("");
    };

    const closeModalAfterUpdate = () => {
        setBasicModalUpdate(!basicModalUpdate);
    };

    const closeModalAfterDelete = () => {
        setBasicModal(!basicModal);
        navigate(`/`, { state: { tab: 'tab4' } })

    };


    const successPaymentHandler = (paymentResult) => {

        dispatch(
            updateUserDetails({
                email: order?.user?.email,
                order_id: order?._id,
                isPaid: true,
            })
        )
    }

    console.log('order', order)

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
                Order Details
            </p>

            <div className="mainContainerCheckout">

                <div className="mainPanelCheckout">
                    <div style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "26px",
                        marginTop: "10px"
                    }}>
                        Order ID
                    </div>
                    <p className='fw-bold mb-1'>{order?._id}</p>

                    <div style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "26px",
                        marginTop: "10px"
                    }}>
                        Status
                    </div>
                    <MDBBadge color={order?.status == 'Not Delivered' ? 'warning' : 'success'} pill>
                        {order?.status}
                    </MDBBadge>

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
                                    order?.user?.image?.url
                                        ? order?.user?.image?.url
                                        : order?.user?.gender == "female"
                                            ? femaleAvatar
                                            : maleAvatar
                                }
                                alt="avatar"
                                className="rounded-circle my-3"
                                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                fluid
                            />
                            <div className='ms-3 overflow-auto'>
                                <p className='fw-bold mb-1'>{order?.user?.user_type}</p>
                                <p className='fw-bold mb-1'>{order?.user?.username}</p>
                                <p className='mb-0' >{order?.user?.email}</p>
                            </div>
                        </MDBRipple>
                    </div>
                    <div style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "26px",
                        marginTop: "10px"
                    }}>
                        OrderItems
                    </div>

                    {order?.orderItems?.length != 0 ?
                        <MDBTable align='middle' className="table">
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'>Total Amount</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {order?.orderItems?.map((itemObj, index) => {

                                    let drugObj = drugs?.find((drug) => drug._id == itemObj.id)

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

                                    </tr>)

                                })}
                            </MDBTableBody>
                        </MDBTable> : 'No Order Items Found'
                    }
                </div>

                {order?.orderItems?.length != 0 &&
                    <div className="sidePanelCheckout" >

                        <div style={{
                            color: "black",
                            fontWeight: "bolder",
                            fontSize: "26px",
                            marginTop: "10px"
                        }}>
                            Order Summary
                        </div>
                        <MDBCardText className="my-1">
                            Total Price : {totalPrice}
                        </MDBCardText>
                        <MDBCardText className="my-1">
                            Tax Price : {(totalPrice * 0.15).toFixed(2)}
                        </MDBCardText>
                        <MDBCardTitle className="fw-bold">
                            Sub Total : {(totalPrice + (totalPrice * 0.15)).toFixed(2)}
                        </MDBCardTitle>

                        {!order?.isPaid && (order?.paymentMethod == 'Paypal') ? (
                            <>
                                {(!sdkReady || loading) ? (
                                    <MDBRow className="d-flex justify-content-center align-items-center my-3">
                                        <MDBSpinner color="primary">
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </MDBSpinner>
                                    </MDBRow>) :
                                    <PayPalButton amount={order.total} onSuccess={successPaymentHandler} />

                                }
                            </>
                        )
                            : !order?.isPaid && (order?.paymentMethod == 'Stripe') ?

                                (<>
                                    {(stripePromise && clientSecret)? (

                                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                                            <CheckoutFormStripe order={order} />
                                        </Elements>

                                    ):
                                    <MDBRow className="d-flex justify-content-center align-items-center my-3">
                                        <MDBSpinner color="primary">
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </MDBSpinner>
                                    </MDBRow>
                                    }

                                </>) :

                                <MDBBadge color={'success'} style={{ width: "80%", height: "40px", fontSize: "20px", margin: "3%" }} pill>
                                    PAID $
                                </MDBBadge>

                        }


                        {userInfo?.user_type == 'admin' ?
                            <>

                                <MDBBtn
                                    className="btn-rounded heroSecBtn-1"
                                    style={{
                                        width: "100%", margin: "3%"
                                    }}
                                    onClick={openUpdateModal}
                                >
                                    Mark as {order?.status == 'Not Delivered' ? 'Delivered' : 'Not Delivered'}
                                </MDBBtn>


                                <MDBBtn color='link' rounded size='sm' onClick={openDeleteModal}>
                                    <MDBIcon
                                        fas icon="trash" />{"   "}
                                    Delete Order
                                </MDBBtn>

                                <MDBBtn color='link' rounded size='sm' onClick={() => navigate(`/`, { state: { tab: 'tab4' } })}>
                                    Go To Orders
                                </MDBBtn>

                            </>

                            :

                            <MDBBtn color='link' rounded size='sm' onClick={() => navigate(`/profile`, { state: { tab: 'tab5' } })}>
                                Go To Orders
                            </MDBBtn>

                        }
                    </div>}


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
                                Delete Order{" "}
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
                                        : `Are you sure to delete this order? `}
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
                                            color={'danger'}
                                            onClick={() => dispatch(updateUserDetails({ email: order?.user?.email, order_id: order?._id, delete_order: true, admin_email: userInfo?.email }))}
                                        >
                                            Remove Order
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
                                Update Order{" "}
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
                                            color={order?.status == 'Not Delivered' ? 'success' : 'warning'}
                                            onClick={() =>
                                                dispatch(
                                                    updateUserDetails({
                                                        email: order?.user?.email,
                                                        order_id: order?._id,
                                                        order_status: order?.status == 'Not Delivered' ? 'Delivered' : 'Not Delivered',
                                                        admin_email: userInfo?.email
                                                    })
                                                )
                                            }
                                        >
                                            Mark as {order?.status == 'Not Delivered' ? 'Delivered' : 'Not Delivered'}
                                        </MDBBtn>
                                    ) : null}
                                </MDBModalFooter>
                            </>
                        )}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    )
}

export default Order;
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Medicine.css'
import { addToCart, removeFromCart } from "../../features/user/userSlice";

import drugImage from "../../assets/3d-blue-pill-package.png";

export const Medicine = (props) => {
    const dispatch = useDispatch();
    const { _id, title, price, image } = props.data;

    const {cart} = useSelector((state) => state.user);

    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {

        let item_ = cart.find(item => item.id == _id)
        if (item_) {
            setCartItemCount(item_.quantity)
        }

    }, [cart]);


    console.log('cart',cart)
    return (
        <div className="product" >
            <img src={image?.url ? image?.url : drugImage} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p> ${price}</p>
            </div>
            <button className="addToCartBttn" onClick={(e) => {
                e.stopPropagation()
                dispatch(addToCart({ id: _id, amount: price, cart }))}}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};
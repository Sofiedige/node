import React, {useState} from 'react'
import {Button, Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {CartItem} from "./CartItem";
import storeItems from "../Data/ProductList.json"
import {Link, Route, Routes} from 'react-router-dom'


export default function Basket() {
    const {cartItems} = useShoppingCart()
    let isDiscount: boolean = false
    let discount: number = 0

    const total = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id)
        total = total + (item?.price || 0) * cartItem.quantity
        isDiscount = false

        if (total >= 300) {
            isDiscount = true
            discount = total * 0.1
            total = total * 0.9
        }
        total.toPrecision(2)
        discount.toPrecision(2)
        return total
    }, 0)

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <aside className="block col-1">
            <h2> Cart Items </h2>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </Stack>
            <div className="total-padding">
                {total > 0 ? (
                    <p>
                        Total {total.toFixed(2)} kr.
                        {!isDiscount ? (
                            <p>
                                Need {(300 - total).toFixed(2)} kr. to get 10% discount
                            </p>
                        ) : (
                            <p>
                                <div style={{color: 'green'}}>
                                    You have saved {discount.toFixed(2)} kr!
                                </div>
                            </p>
                        )}
                    </p>
                ) : (
                    <p>No items added in cart</p>
                )}
            </div>

            {total > 0 && (
                <button
                    className={`checkout-button ${hover ? 'hover' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Checkout
                </button>
            )}
        </aside>
    );
}
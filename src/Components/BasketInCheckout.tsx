import {Button, Stack} from "react-bootstrap";
import storeItems from "../Data/ProductList.json"
import {useLocation} from 'react-router-dom'
import {CartItemInCheckout} from "./CartItemInCheckout";
import React from "react";


export default function BasketInCheckout() {
    let isDiscount: boolean = false
    let discount: number= 0

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cartItems = JSON.parse(queryParams.get('cartItems') || '[]');

    const total = cartItems.reduce((total: number, cartItem: { id: string; quantity: number; }) => {
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


    //tilføj rebatlogik.
    return (
        <aside className="block col-1">
            <h2> Cart Items </h2>

            <Stack className = "my-cart-items" gap={0}>
                {cartItems.map((item: JSX.IntrinsicAttributes & { id: string; quantity: number; }) => (
                    <CartItemInCheckout key={item.id} {...item} />
                ))}
            </Stack>
            <div>
                {total > 0 ? (
                    <p>
                        Total {total.toFixed(2)} kr.
                        {!isDiscount ? (
                            <p>
                                Need {(300 - total).toFixed(2)} kr. to get 10% discount
                            </p>
                        ) : (
                            <p>
                                <div style={{ color: 'green' }}>
                                    You have saved {discount.toFixed(2)} kr!
                                </div>
                            </p>


                        )}

                    </p>
                ) : (
                    <p>No items added in cart</p>
                )}
            </div>
        </aside>

    )

}
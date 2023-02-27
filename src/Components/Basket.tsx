import React from 'react'
import {Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {CartItem} from "./CartItem";
import storeItems from "../Data/ProductList.json"


export default function Basket(){
    const {cartItems} = useShoppingCart()
    return(
        <aside className= "block col-1">
            <h2> Cart Items </h2>
            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key = {item.id} {...item} />
                ))}
            </Stack>
            <div className={"ms-auto fw-bold fs-5"}>
                Total {" "}
            {cartItems.reduce((total,cartItem) => {
                const item = storeItems.find(i=>i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
            },0)} DKK
            </div>
        </aside>

    )
}
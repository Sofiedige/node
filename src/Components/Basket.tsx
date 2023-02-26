import React from 'react'
import {Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {CartItem} from "./CartItem";

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
        </aside>
    )
}
import React, {useState} from 'react'
import {useShoppingCart} from "../context/ShoppingCartContext";
import {CartItem} from "./CartItem";
import storeItems from "../Data/ProductList.json"
import {navigate} from "../App";

export default function Basket() {
    //const {cartItems, storeItems} = useShoppingCart()

    /*
    For "Others also bought ... " with expensive items at the bottom of cart.
    Feature not finished.
    const sortedStoreItems = [...storeItems].sort((a, b) => a.price - b.price);
    const upsellItems = sortedStoreItems.slice(0,3)
     */
    let isTotalDiscount: boolean = false
    let isQuanDiscount: boolean = false
    const {cartItems} = useShoppingCart()

    let totalDiscount: number = 0
    let quanDiscount: number = 0

    let discount: number = 0

    const total = cartItems.reduce((total, cartItem) => {
        //const item = storeItems.find(i => i.id === cartItem.id)

        //calculates possible quantity discount.
        if (cartItem.isRebateQuantity) {
            quanDiscount = (cartItem.price || 0) * cartItem.quantity * 0.1
            total = total + (cartItem.price || 0) * cartItem.quantity * 0.9
            isQuanDiscount = true
        } else {
            total = total + (cartItem.price || 0) * cartItem.quantity
        }

        //calculates discount for when total is over 300
        if (total >= 300) {
            isTotalDiscount = true
            totalDiscount = total * 0.1
            total = total * 0.9
        }
        total.toPrecision(2)
        totalDiscount.toPrecision(2)
        quanDiscount.toPrecision(2)

        discount = totalDiscount+quanDiscount

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
            <p>
                Buy 10 or more of the same fruit to enjoy a 10% discount!
                <br/>
                For fruits over 20 kr, you only need to add 5 to save 10%
            </p>
            <div className="cart-items">
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </div>
            <div className="total-padding">
                {total > 0 ? (
                    <p>
                        Total {total.toFixed(2)} kr.
                        {!isTotalDiscount ? (
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
                    onClick={(event) => navigate(event, "checkout")}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Checkout
                </button>
            )}
        </aside>
    );
}
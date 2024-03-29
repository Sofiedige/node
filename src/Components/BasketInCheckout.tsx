import storeItems from "../Data/ProductList.json"
import {CartItemInCheckout} from "./CartItemInCheckout";
import {useShoppingCart} from "../context/ShoppingCartContext";


export default function BasketInCheckout() {
    let isDiscount: boolean = false
    let discount: number= 0

    const {cartItems} = useShoppingCart()

    const total = cartItems.reduce((total: number, cartItem: { id: string; quantity: number; imageUrl: string}) => {
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
        <div className="my-cart-items">
        <h2>Cart Items</h2>
            <div>
                {cartItems.map((item: JSX.IntrinsicAttributes & { id: string; quantity: number; imageUrl: string}) => (
                    <CartItemInCheckout name={""} key={item.id} {...item} />
                ))}
            </div>
            {total > 0 ? (
                <p >
                    Total {total.toFixed(2)} kr.
                    {!isDiscount ? (
                        <p className="text">Need {(300 - total).toFixed(2)} kr. to get 10% discount</p>
                    ) : (
                        <p className="discount-message">
                            You have saved {discount.toFixed(2)} kr!
                        </p>
                    )}
                </p>
            ) : (
                <p>No items added in cart</p>
            )}
        </div>


    )

}

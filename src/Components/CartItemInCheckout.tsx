import React from "react";
import {useShoppingCart} from "../context/ShoppingCartContext";


type CartItemProps = {
    id: string
    quantity: number
    imageUrl: string
    name: string
}

export function CartItemInCheckout({id, quantity}: CartItemProps) {
    const {getItemUrl, getItemName} = useShoppingCart();

    return (
        <div className="card-item">
            <div>
                <div>
                    <img className = "itemPics"
                         src = {`https://raw.githubusercontent.com/Sofiedige/node/main/public${getItemUrl(id)}`}
                    />
                    {getItemName(id)}{" "}
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
          x{quantity}
        </span>
                </div>
            </div>
        </div>
    );
}
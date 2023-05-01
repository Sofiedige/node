import {CartItemModel, useShoppingCart} from "../context/ShoppingCartContext";
import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";

type CartItemProps = {
    id: string;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const {removeItem, incrementItem, decrementItem, storeItems, setQuantity} = useShoppingCart();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const item = storeItems.find((i: CartItemModel) => i.id === id);
    if (item == null) return null;

    return (
        <div className={`cart-item ${isVisible ? "slide-in" : ""}`}>
            <div>
                <div>
                    <img
                        className="itemPics"
                        src={`https://raw.githubusercontent.com/Sofiedige/node/main/public${item.imageUrl}`}
                        alt={item.name}
                        width="50"
                        height="40"
                    />
                    {item.name}{" "}
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
          {item.price} kr.
        </span>
                </div>
            </div>
            <div>
                <div className="mycenter" style={{ gap: ".5rem" }}>
                    <div>
                        <select className={"select"}
                            value={quantity}
                            onChange={(e) => setQuantity(id, parseInt(e.target.value))}
                        >
                            {Array.from({ length: 30 }, (_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span>{(item.price * quantity).toFixed(2)} kr.</span>
                    <div className="remove-btn" onClick={() => removeItem(id)}>
                        Remove
                    </div>
                </div>
            </div>
            <div className={"solid"}> </div>
        </div>
    );
}

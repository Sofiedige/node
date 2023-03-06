import {useShoppingCart} from "../context/ShoppingCartContext";
import storeItems from "../Data/ProductList.json"
import {Button, Stack} from "react-bootstrap";
import React from "react";


type CartItemProps = {
    id: string
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps) {
    const {removeItem, incrementItem, decrementItem} = useShoppingCart()
    const item = storeItems.find(i => i.id == id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2}>
            <div className="me-auto">
                <div>
                    {item.name} <span
                    className="text-muted" style={{fontSize: ".65rem"}}>
                    x{quantity}
                </span>
                </div>

                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {item.price} DKK
                </div>
            </div>
            {item.price * quantity} DKK
            <div>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{gap: ".5rem"}}
                >
                    {quantity > 1 ? <Button onClick={() => decrementItem(id)}
                                            variant="success"
                    >-</Button> : <Button
                        variant="secondary"
                    >-</Button>}


                    <div>
                        <span className="fs-3">{quantity}</span> in cart
                    </div>
                    <Button onClick={() => incrementItem(id)}
                            variant="success"
                    >+</Button>
                </div>
                <Button
                    onClick={() => removeItem(id)}
                    variant="secondary"
                    size="sm"
                >
                    Remove
                </Button>
            </div>
        </Stack>
    )
}
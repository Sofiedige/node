import storeItems from "../Data/ProductList.json"
import {Stack} from "react-bootstrap";
import React from "react";


type CartItemProps = {
    id: string
    quantity: number
}

export function CartItemInCheckout({id, quantity}: CartItemProps) {
    const item = storeItems.find(i => i.id == id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2}>
            <div>
                <div>
                    {item.name}{" "}
                    <span className="text-muted" style={{ fontSize: ".65rem" }}>
          x{quantity}
        </span>
                </div>
            </div>
        </Stack>
    );
}
import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";

interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    imageUrl: string;
}

export function CheckoutItem({id, name, price}:
                                 Product) {
    const {getItemQuantity, incrementItem, decrementItem, removeItem} = useShoppingCart()
    const quantity = getItemQuantity(id)

export function CheckoutItem({id, name, price, imageUrl}:
    Product){
    return <Card>
        <Card.Img
            variant="top"
            src={imageUrl}
            height="200px"
            style={{objectFit: "cover"}}
        />

    <Card.Body className ="d-flex flex-column">
        <Card.Title className="d-flex
        justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{"DKK "}{price}</span>
                <div
                    className="d-flex align-items-center flex-column"
                    style={{gap: ".5rem"}}
                >
                </div>

            </Card.Title>
            <Button onClick={() => incrementItem(id)}
                    variant="success"
            >Add to cart</Button>
        </Card.Body>
    </Card>
}


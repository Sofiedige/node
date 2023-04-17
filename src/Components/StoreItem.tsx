import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";

export function CheckoutItem({id, name, price, imageUrl}: Product) {
    const {incrementItem} = useShoppingCart()

    return <Card className="primaryColor">
        <Card.Img
            variant="top"
            src = {`https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl}`}
            height="180px"
            style={{objectFit: "cover"}}
        />
        <Card.Body className="card-body">
            <Card.Title className="card-title">
                <span className="fs-5">{name}</span>
                <span className="ms-4 text-muted">{price}{" kr."}</span>

            </Card.Title>
            <Button className="add-to-cart-button" onClick={() => incrementItem(id)}
                    variant="success"
                >
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
}


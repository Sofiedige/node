import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";

export function CheckoutItem({id, name, price, imageUrl}: Product) {
    const {incrementItem} = useShoppingCart()

    return <Card className="primaryColor">
        <Card.Img
            variant="top"
            src = {`https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl}`}
            height="100px"
            style={{objectFit: "cover"}}
        />

        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{price}{" kr."}</span>
                <div
                    className="d-flex align-items-center flex-column"
                    style={{gap: ".5rem"}}
                >
                </div>

            </Card.Title>
            <Button className="add-to-cart-button" onClick={
                () => incrementItem(id)
            }
                    variant="success"
            >Add to cart</Button>
        </Card.Body>
    </Card>
}


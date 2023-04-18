import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";

export function CheckoutItem({id, name, price, imageUrl}: Product) {
    const {incrementItem} = useShoppingCart()
    return (
        <Card className="product-card">
            <Card.Img
                variant="top"
                src={`https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl}`}
                className="product-card__image"
                height="180px"
                style={{objectFit: "cover"}}
            />
            <Card.Body className="card-body">

                    <span className="product-card__name">{name}</span>
                    <span className="product-card__price">{price} kr.</span>

                <Button
                    className="product-card__button"
                    onClick={() => incrementItem(id)}
                    variant="success"
                >
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
}


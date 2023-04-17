import {Button, Card} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";

export function CheckoutItem({id, name, price, currency, rebateQuantity, rebatePercent, imageUrl}: Product) {
    const {incrementItem} = useShoppingCart()
    return (
        <Card className="product-card">
            <Card.Img
                variant="top"
                src={`https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl}`}
                height="100px"
                className="product-card__image"
            />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="product-card__name">{name}</span>
                    <span className="product-card__price">{price} kr.</span>
                </div>
                <Button
                    className="product-card__button"
                    onClick={() => {
                        incrementItem(id)
                    }
                }
                    variant="success"
                >
                    Add to cart
                </Button>
            </Card.Body>
        </Card>
    );
}


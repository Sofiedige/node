import {useShoppingCart} from "../context/ShoppingCartContext";
import {Product} from "./Items";

export function CheckoutItem({id, name, price, imageUrl}: Product) {
    const {getExpensiveItem} = useShoppingCart()
    const {incrementItem} = useShoppingCart()
    return (
        <div className="product-card">
            <div className="product-card_image"
                 style={{ backgroundImage: `url(https://raw.githubusercontent.com/Sofiedige/node/main/public${imageUrl})` }}
            />
            <div className={` ${getExpensiveItem(id) ? "expensive_item" : "card-body"}`}>
                 <span className="product-card__name">{name}</span>
                    <span className="product-card__price">{price} kr.</span>

                <button
                    className="product-card__button"
                    onClick={() => incrementItem(id)}
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}


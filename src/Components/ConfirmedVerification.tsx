import BasketInCheckout from "./BasketInCheckout";
import {navigate} from "../App";
import {useShoppingCart} from "../context/ShoppingCartContext";

export default function ConfirmedVerification() {
    const {removeFromLocalStorage} = useShoppingCart()

    return (
        <>
            <p className = "verification">
                <BasketInCheckout/>
            </p>
            <div className="row-middle">
                <img className="verificationimage" src="verification1.png" alt="verificationlogo"/>
                <h2>Thank you!</h2>
                <h1>We're very glad that you choose to use Juicy Jamboree, we will pack your items as soon as
                    possible.</h1>
                <div>
                    <button className="continue-button"
                            onClick={(event) => {
                                navigate(event, "home")
                                removeFromLocalStorage()
                            }
                    }>
                        Continue shopping


                    </button>
                </div>
            </div>
        </>
    );
}

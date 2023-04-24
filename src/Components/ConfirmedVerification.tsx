import BasketInCheckout from "./BasketInCheckout";
import {navigate} from "../App";

export default function ConfirmedVerification() {


    return (
        <> <p>
        <BasketInCheckout/>
        </p>

    <h2 className="center"> Thank you! </h2>
    <h1 className="center">We're very glad that you choose to use Juice Jamboree, we will pack your items as soon as possible</h1>
            <div className="continue-button">
                <button onClick={(event) => navigate(event, "home")}>Continue shopping</button>
            </div>
            </>

            );
}

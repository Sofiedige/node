import BasketInCheckout from "./BasketInCheckout";
import {navigate} from "../App";

export default function ConfirmedVerification() {


    return (
        <>
            <p>
                <BasketInCheckout/>
            </p>
            <div className="center">
                <img className="billede" src="verification.png" alt="verificationlogo"/>
                <h2>Thank you!</h2>
                <h1>We're very glad that you choose to use Juice Jamboree, we will pack your items as soon as
                    possible.</h1>
                <div>
                    <button className="continue-button" onClick={(event) => navigate(event, "home")}>
                        Continue shopping
                    </button>
                </div>
            </div>
        </>
    );
}

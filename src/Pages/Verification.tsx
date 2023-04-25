import Header from "../Components/Header";
import Items from "../Components/Items";
import BasketInCheckout from "../Components/BasketInCheckout";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";
import ConfirmedVerification from "../Components/ConfirmedVerification";

export function Verification() {
    return (
        <ShoppingCartProvider>
            <div>
                <Header/>

<div
    className="row">
</div>
                <ConfirmedVerification/>

            </div>
        </ShoppingCartProvider>
    );


}

import Header from "../Components/Header";
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

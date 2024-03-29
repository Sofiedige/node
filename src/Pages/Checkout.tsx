import Billing from "../Components/Billing";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";
import Header from "../Components/Header";

export function Checkout(){
    return <ShoppingCartProvider>
        <div>
            <Header></Header>
            <div className="row">

             <Billing></Billing>
            </div>
        </div>
    </ShoppingCartProvider>
}

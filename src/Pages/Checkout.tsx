import Billing from "../Components/Billing";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import Items from "../Components/Items";
import Basket from "../Components/Basket";

export function Checkout(){
    return <ShoppingCartProvider>
        <div>
            <Header></Header>
            <Billing></Billing>
        </div>
    </ShoppingCartProvider>
}
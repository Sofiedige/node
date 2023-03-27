import Header from "../Components/Header";
import Items from "../Components/Items";
import Basket from "../Components/Basket";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";

export default function Home() {
    return (
        <ShoppingCartProvider>
            <div>
                <Header/>
                <div className="row">
                    <Items/>
                    <Basket/>
                </div>
            </div>
        </ShoppingCartProvider>
    );


}

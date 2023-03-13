import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import Items from "../Components/Items";
import Basket from "../Components/Basket";
import {ShoppingCartProvider} from "../context/ShoppingCartContext";

export function Home(){
    return  <ShoppingCartProvider>
        <div><Header></Header>
            <SearchBar></SearchBar>
            <div className="row">
                <Items></Items>
                <Basket></Basket>
            </div>
        </div>

    </ShoppingCartProvider>
}


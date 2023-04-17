import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {CartItem} from "../Components/CartItem";

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number
    incrementItem: (id: string) => void
    decrementItem: (id: string) => void
    removeItem: (id: string) => void
    cartItems: CartItemModel[]
    storeItems: CartItemModel[]
    getItemUrl: (id: string) => string
    getItemName: (id: string) => string
}

export type CartItemModel = {
    id: string
    quantity: number
    imageUrl: string
    name: string
    price: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
    const [storeItems, setStoreItems] = useState<CartItemModel[]>([]);

    useEffect(() => {
        async function fetchProductList() {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/Sofiedige/node/main/src/Data/ProductList.json"
                );
                const data = await response.json();
                setStoreItems(data);
                console.error("din far")
            } catch (error) {
                console.error(error);
            }
        }
        fetchProductList();
    }, []);

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem("cartItems");
        if (cartItemsFromStorage) {
            setCartItems(JSON.parse(cartItemsFromStorage));
        }
    }, []);

    function getItemQuantity(id: string) {
        return cartItems.find((item) => item.id == id)?.quantity || 0;
    }

    function getItemUrl(id: string) {
        return storeItems.find((item) => item.id == id)?.imageUrl || "";
    }

    function getItemName(id: string) {
        return storeItems.find((item) => item.id == id)?.name || "";
    }

    function getItemPrice(id: string) {
        return storeItems.find((item) => item.id == id)?.price || 0;
    }

    function incrementItem(id: string) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id == id) == null) {
                return [...currItems, { id, quantity: 1, imageUrl: getItemUrl(id), name: getItemName(id), price: getItemPrice(id)}];
            } else {
                return currItems.map((item) => {
                    if (item.id == id) {
                        return { ...item, quantity: item.quantity + 1, imageUrl: getItemUrl(id), name: getItemName(id), price: getItemPrice(id) };
                    } else {
                        return item;
                    }
                });
            }
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function decrementItem(id: string) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id == id)?.quantity == 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id == id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function removeItem(id: string) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    return (
        <ShoppingCartContext.Provider
            value={{ getItemQuantity, incrementItem, decrementItem, removeItem, cartItems, storeItems, getItemUrl, getItemName}}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}

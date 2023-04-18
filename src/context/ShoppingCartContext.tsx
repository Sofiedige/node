import {createContext, ReactNode, useContext, useEffect, useState} from "react";

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
            const existingItemIndex = currItems.findIndex((item) => item.id === id);
            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, update its quantity
                const updatedItems = [...currItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
                return updatedItems;
            } else {
                // If the item doesn't exist in the cart, add it with quantity 1
                const newCartItem = {
                    id,
                    quantity: 1,
                    imageUrl: getItemUrl(id),
                    name: getItemName(id),
                    price: getItemPrice(id),
                };
                const updatedItems = [...currItems, newCartItem];
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
                return updatedItems;
            }
        });
    }


    function decrementItem(id: string) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item.id !== id)));
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
    }

    function removeItem(id: string) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item.id !== id)));
    }

    return (
        <ShoppingCartContext.Provider
            value={{ getItemQuantity, incrementItem, decrementItem, removeItem, cartItems, storeItems, getItemUrl, getItemName}}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}

import {createContext, ReactNode, useContext, useState} from "react";
import {navigate} from "../App";

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number
    incrementItem: (id: string) => void
    decrementItem: (id: string) => void
    removeItem: (id: string) => void
    cartItems: CartItem[]
}

type CartItem = {
    id: string
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id == id)?.quantity || 0
    }

    function incrementItem(id: string) {
        setCartItems(currItems => {
            if (currItems.find((item => item.id == id)) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id == id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decrementItem(id: string) {
        setCartItems(currItems => {
            if (currItems.find((item => item.id == id))?.quantity == 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id == id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeItem(id: string) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{getItemQuantity, incrementItem, decrementItem, removeItem, cartItems}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
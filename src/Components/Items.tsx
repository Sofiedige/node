import { useState, useEffect } from 'react';
import { CheckoutItem } from "./StoreItem";

export interface Product {
    id: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    isExpensive: number;
    imageUrl: string;
}

export default function Items() {
    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/Sofiedige/node/main/src/Data/ProductList.json"
                );
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
   // const filteredTypes = items.filter(items => items.type.toLowerCase().includes("eksotiskefrugter"));

    return (
        <aside className="block col-2">
            <input
                className="bar"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <h2>Products</h2>
            <div className="row-container">
                {filteredItems.map(item => (
                    <div key={item.id} className="col-container">
                        <CheckoutItem {...item} />
                    </div>
                ))}
            </div>
        </aside>
    );
}

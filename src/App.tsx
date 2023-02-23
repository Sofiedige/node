import { useState, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import itemsJSON from './ProductList.json'
import {nick} from "./ProductList";
import './App.css'
import {GalleryList } from './Components/ProductImage';


interface Product{
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
}

const items: Product[] = itemsJSON


function App() {
  const [count, setCount] = useState(0)
    console.log(items)
    return (
        <div className = "App">
            console.log(items)
            console.log(products);
    <h1 className= {"title"}> Groceries </h1>
            <GalleryList/>
            console.log(items)
        </div>

  )
    console.log("hi")
    console.log(items)
}

export default App

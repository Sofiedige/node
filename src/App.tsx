import { useState, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import itemsJSON from './ProductList.json'
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

    return (
        <div className = "App">

    <h1 className= {"title"}> Groceries </h1>
            <GalleryList/>
        </div>
        
  )
}

export default App

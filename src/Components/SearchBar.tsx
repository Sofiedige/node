import React, {useState} from 'react';
import items from "../Data/ProductList.json"

export default function SearchBar() {
    const [inputs, setInputs] = useState("")
    return <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <input className={"bar"} text-align={"center"} type="text"
            placeholder={"Search..."} value={inputs} onChange={e => setInputs(e.target.value)}/>
        </div>
    </>
    
}


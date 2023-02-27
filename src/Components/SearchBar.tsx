import React, {useState} from 'react';


export default function SearchBar() {
    const [count, setCount] = useState("")
    return <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <input className={"bar"} text-align={"center"} type="text"
            placeholder={"Search..."} onChange={e => setCount(e.target.value)}/>
        </div>
    </>
}
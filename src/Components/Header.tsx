import React from 'react'

export default function Header() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1><img className={"billedestyle"}
                     src={"logo.png"}
                     alt={"logo"}
            /> </h1>
        </div>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>
                <Link className={"link"}
                      to="../" relative="path">

                <img className={"billedestyle"}
                     src={"logo.png"}
                     alt={"logo"}
            />
                </Link>
            </h1>
        </div>
    )
}
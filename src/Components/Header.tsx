import React from 'react'
import { Link } from 'react-router-dom'
import {navigate} from "../App";

export default function Header() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>
                <Link className={"link"}
                      to="">

                <img className={"billedestyle"}
                     src={"logo.png"}
                     alt={"logo"}
                     onClick={(event) => navigate(event, "home")}
            />
                </Link>
            </h1>
        </div>
    )
}
import React, {useState} from 'react'
import {Stack} from "react-bootstrap";
import {CartItem} from "./CartItem";

//checkout

export default function Billing() {

    return (
        <><h2> Enter information </h2>
            <form className="bill">

                <label>First name *</label>
                <input
                    type="text"
                    required
                />
                <label>Last name *</label>
                <input
                    type="text"
                    required
                />

                <label>Phone number</label>
                <input
                    type="number"
                />

                <label>E-mail *</label>
                <input
                    type="email"
                    required
                />

                <label>Country *</label>
                <select>
                    <option value="Denmark">Denmark</option>
                </select>

                <label>Zip code *</label>
                <input
                    type="number"
                    required
                />

                <label>City *</label>
                <input
                    type="text"
                    required
                />

                <label>Address line 1 *</label>
                <input
                    type="text"
                    required
                />

                <label>Address line 2</label>
                <input
                    type="text"
                />

                <label>Company name</label>
                <input
                    type="text"
                />

                <label>Company VAT number</label>
                <input
                    type="number"
                />

                <div>
                    <button>Continue</button>

                </div>
            </form>
        </>

    )
}

/*
 - zip code, if Denmark, validate against https://api.dataforsyningen.dk/postnumre
  - city, if Denmark provide automatically from zip code
  - address line 1 and 2
  - name
  - phone, if Denmark, validate as 8 digits
  - email, validate as valid email address
 */
import React, {InputHTMLAttributes, useState} from 'react'
import {Stack} from "react-bootstrap";
import {CartItem} from "./CartItem";
import {Link, Route, Routes} from 'react-router-dom'
import {Home} from "../Pages/Home"


//checkout

export default function Billing() {

    const [zipCode, setZipCode] = useState<number | null>(null);
    const [cityName, setCityName] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleZipCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZipCode = event.target.value;
        const parsedZipCode = parseInt(newZipCode, 10);

        if ((!isNaN(parsedZipCode) && newZipCode.length <= 4) || newZipCode.length == 0) {
            setZipCode(parsedZipCode);

            if (newZipCode.length === 4) {

                setLoading(true);

                setTimeout(()=> {
                        setLoading(false)},2000);
                try {

                    const response = await fetch(`https://api.dataforsyningen.dk/postnumre?nr=${newZipCode}`);
                    const json = await response.json();
                    setCityName(json[0]?.navn || "");

                } catch (error) {
                    console.error(error);
                    setCityName("");
                }
            }
               else {
                setCityName("");
            }
        }
    }


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

                <div>
                    <input
                        id="zip"
                        maxLength={4}
                        type="number"
                        required
                        value={zipCode ?? ''}
                        onChange={handleZipCodeChange}
                    />

                    {zipCode !== null && zipCode.toString().length !== 4 && <p>Please enter a 4-digit zip code.</p>}
                    {loading !== null && loading && <div>Loading..</div>}

                </div>

                <label>City *</label>
                <input
                    type="text"
                    required
                    value={ cityName.toString()}
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
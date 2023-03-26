import React, {InputHTMLAttributes, useState} from 'react'
import {Col, Row, Stack} from "react-bootstrap";
import {CartItem} from "./CartItem";
import {Link, Route, Routes} from 'react-router-dom'
import {Home} from "../Pages/Home"
import {CheckoutItem} from "./StoreItem";


//checkout

export default function Billing() {

    const [loading, setLoading] = useState<boolean>(false);

    const [zipCode, setZipCode] = useState<String>("");
    const [cityName, setCityName] = useState<String>("");
    const [zipMessage, setZipMessage] = useState<String>("");
    const handleZipCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZipCode = event.target.value;

        if(newZipCode.length == 0){
            setZipCode("")

        }else if (!isNaN(Number(newZipCode)) && newZipCode.length <= 4) {
            setZipCode(newZipCode);

            if (newZipCode.length === 4) {
                setLoading(true);

                try {
                    const response = await fetch(`https://api.dataforsyningen.dk/postnumre?nr=${newZipCode}`);
                    const json = await response.json();

                    setTimeout(()=> {
                        setLoading(false);
                        setCityName(json[0]?.navn || "");
                    }, 2000);

                    if(JSON.stringify(json) === "[]"){
                        setZipMessage("Zip code does not exist!")
                    }else{
                        setZipMessage("")
                    }


                } catch (error) {}
            } else {
                setCityName("");
                setZipMessage("")
            }
        }
    }

    const [phoneNumber, setPhoneNumber] = useState<String>("");

    function isValidPhoneNumber(phoneNumber: string): boolean {
        const regex = /^(\+|\d)[0-9]*$/;
        return regex.test(phoneNumber);
    }

    const handlePhoneNumberChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = event.target.value;

        if(newPhoneNumber.length == 0){
            setPhoneNumber("")

        }else if (isValidPhoneNumber(newPhoneNumber)){
            setPhoneNumber(newPhoneNumber);
        }
    }


    return (
        <><h2> Enter information </h2>

            <form className="bill">


                <Row lg={2} md={2} xs={1} className="g-3">
                    {
                        <><Col>
                            <label>First name *</label>
                            <input
                                type="text"
                                required/>
                        </Col><Col>

                            <label>Last name *</label>
                            <input
                                type="text"
                                required
                            />

                        </Col></>

                    }
                </Row>





                <label>Phone number</label>
                <input
                    type="text"
                    minLength={8}
                    maxLength={12}
                    value={phoneNumber.toString()}
                    onChange={handlePhoneNumberChange}
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
                        type="text"
                        required
                        value={zipCode.toString()}
                        onChange={handleZipCodeChange}
                    />
                    {loading !== null && loading && <div>Loading..</div>}
                    {!loading && <p>{zipMessage}</p>}

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
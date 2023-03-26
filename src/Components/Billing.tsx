import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import LoadingIndicator from './LoadingIndicator';
import BasketInCheckout from "./BasketInCheckout";
import {useLocation} from "react-router-dom";


export default function Billing() {

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // prevent default form submission behavior
        handleMySubmit()
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cartItems = JSON.parse(queryParams.get('cartItems') || '[]');

    function handleMySubmit() {
        setIsLoading(true);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const cartItemData = cartItems.map((item: { id: any; quantity: any; }) => {
            return {
                id: item.id,
                quantity: item.quantity,
            };
        });

        const body = {
            test: "event",
            zip: zipCode.toString(),
            city: cityName.toString(),
            email: email,
            firstName: firstName,
            sirName: lastName,
            phoneNumber: phoneNumber,
            cartItem: cartItemData,
        };

        const options: RequestInit = {
            method: "POST",
            headers,
            mode: "cors",
            body: JSON.stringify(body),
        }
        fetch("https://eo6qnsie1ivk0gm.m.pipedream.net", options).then(() => setIsLoading(false))
    }

    const [loading, setLoading] = useState<boolean>(false);

    const [zipCode, setZipCode] = useState<String>("");
    const [cityName, setCityName] = useState<String>("");
    const [zipMessage, setZipMessage] = useState<String>("");
    const handleZipCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZipCode = event.target.value;

        if (newZipCode.length == 0) {
            setZipCode("")

        } else if (!isNaN(Number(newZipCode)) && newZipCode.length <= 4) {
            setZipCode(newZipCode);

            if (newZipCode.length === 4) {
                setLoading(true);

                try {
                    const response = await fetch(`https://api.dataforsyningen.dk/postnumre?nr=${newZipCode}`);
                    const json = await response.json();

                    setTimeout(() => {
                        setLoading(false);
                        setCityName(json[0]?.navn || "");
                    }, 2000);

                    if (JSON.stringify(json) === "[]") {
                        setZipMessage("Zip code does not exist!")
                    } else {
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

        if (newPhoneNumber.length == 0) {
            setPhoneNumber("")

        } else if (isValidPhoneNumber(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    }


    return (
        <><BasketInCheckout/>
            <div className="checkout-container">
                <div className="form-container">
                    <h2>Enter information</h2>
                    <LoadingIndicator show={isLoading}/>

                    <form className="bill" onSubmit={handleSubmit}>
                        <Row lg={2} md={2} xs={1} className="g-3">
                            <Col>
                                <div className="form-group">
                                    <label>First name *</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            if (!/\d+$/.test(value)) {
                                                setFirstName(value);
                                            }
                                        }}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="form-group">
                                    <label>Last name *</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            if (!/\d+$/.test(value)) {
                                                setLastName(value);
                                            }
                                        }}
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input
                                required
                                type="text"
                                minLength={8}
                                maxLength={12}
                                value={phoneNumber.toString()}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail *</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country *</label>
                            <select>
                                <option value="Denmark">Denmark</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Zip code *</label>
                            <div className="zip-group">
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
                        </div>
                        <div className="form-group">
                            <label>City *</label>
                            <input
                                type="text"
                                required
                                value={cityName.toString()}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address line 1 *</label>
                            <input
                                type="text"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address line 2</label>
                            <input
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label>Company name</label>
                            <input
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label>Company VAT number</label>
                            <input
                                type="number"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

/*
 - zip code, if Denmark, validate against https://api.dataforsyningen.dk/postnumre
  - city, if Denmark provide automatically from zip code
  - address line 1 and 2
  - name
  - phone, if Denmark, validate as 8 digits
  - email, validate as valid email address
 */
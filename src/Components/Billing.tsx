import {useState} from 'react'
import LoadingIndicator from './LoadingIndicator';
import BasketInCheckout from "./BasketInCheckout";
import {useShoppingCart} from "../context/ShoppingCartContext";
import storeItems from "../Data/ProductList.json";
import {navigate} from "../App";

export function isValidPhoneNumber(phoneNumber: string): boolean {
    const regex = /^(\+|\d)[0-9]*$/;
    return regex.test(phoneNumber);
}

export default function Billing() {
    const [companyName, setCompanyName] = useState("");
    const [companyVatNumber, setCompanyVatNumber] = useState("");
    const [isCompanyNameFilled, setIsCompanyNameFilled] = useState(false);
    const handleCompanyNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCompanyName(e.target.value);
        setIsCompanyNameFilled(Boolean(e.target.value));
    };
    const handleCompanyVatNumberChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCompanyVatNumber(e.target.value);
    };

    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const handleAddressLine1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressLine1(e.target.value);
    };
    const handleAddressLine2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressLine2(e.target.value);
    };

    const [comment, setComment] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const {cartItems} = useShoppingCart()

    let isDiscount: boolean = false
    let discount: number = 0
    const total = cartItems.reduce((total: number, cartItem: { id: string; quantity: number; imageUrl: string }) => {
        const item = storeItems.find(i => i.id === cartItem.id)
        total = total + (item?.price || 0) * cartItem.quantity
        isDiscount = false


        if (total >= 300) {
            isDiscount = true
            discount = total * 0.1
            total = total * 0.9
        }
        total.toPrecision(2)
        discount.toPrecision(2)
        return total
    }, 0)

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // prevent default form submission behavior
        handleMySubmit(event)
    };

    function handleMySubmit(event: { preventDefault: () => void; }) {
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
            zip: zipCode.toString(),
            city: cityName.toString(),
            email: email,
            firstName: firstName,
            sirName: lastName,
            phoneNumber: phoneNumber,
            companyName: companyName,
            companyVatNumber: companyVatNumber,
            cartItem: cartItemData,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            comment: comment,
            price: total
        };

        const options: RequestInit = {
            method: "POST",
            headers,
            mode: "cors",
            body: JSON.stringify(body),
        }
        fetch("https://eo6qnsie1ivk0gm.m.pipedream.net", options).then(() => {
            setIsLoading(false)
            navigate(event, "continue")
        })
    }

    const handleCommentChange = async (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(e.target.value)
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
                    }, 1000);

                    if (JSON.stringify(json) === "[]") {
                        setZipMessage("Zip code does not exist!")
                    } else {
                        setZipMessage("")
                    }
                } catch (error) {
                }
            } else {
                setCityName("");
                setZipMessage("")
            }
        }
    }

    const [phoneNumber, setPhoneNumber] = useState<String>("");

    const handlePhoneNumberChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = event.target.value;

        if (newPhoneNumber.length == 0) {
            setPhoneNumber("")

        } else if (isValidPhoneNumber(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    }

    return (
        <> <p>
            <BasketInCheckout/>

            <div className="goback-container">
            <div className="goback-button"
                    onClick={(event) =>
                        navigate(event, "home")}>
                Go back to shopping

            </div>
            </div>
        </p>
            <div className="checkout-container">
                <div className="form-container">
                    <h2 className="center">Enter information</h2>
                    <form className="bill" onSubmit={handleSubmit}>
                        <div className="my-container">
                            <div className = "my-row">
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

                                        onInvalid={(event) => {
                                            (event.target as HTMLInputElement).setCustomValidity("You need to fill out your name!")
                                        }}
                                        onInput={(event) => {
                                            (event.target as HTMLInputElement).setCustomValidity("")
                                        }}
                                    />
                                </div>
                            </div>

                            <div className = "my-row">
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

                                        onInvalid={(event) => {
                                            (event.target as HTMLInputElement).setCustomValidity("You need to fill out last name!")
                                        }}
                                        onInput={(event) => {
                                            (event.target as HTMLInputElement).setCustomValidity("")
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input
                                type="text"
                                minLength={8}
                                maxLength={12}
                                value={phoneNumber.toString()}
                                onChange={handlePhoneNumberChange}

                                onInvalid={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("You need to fill in your correct phone number")
                                }}
                                onInput={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("")
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail *</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}

                                onInvalid={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("Please fill out a valid mail!")
                                }}
                                onInput={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("")
                                }}
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

                                    onInvalid={(event) => {
                                        (event.target as HTMLInputElement).setCustomValidity("Invalid zip info")
                                    }}
                                    onInput={(event) => {
                                        (event.target as HTMLInputElement).setCustomValidity("")
                                    }}
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
                                defaultValue={cityName.toString()}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address line 1 *</label>
                            <input
                                type="text"
                                value={addressLine1}
                                onChange={handleAddressLine1Change}
                                required

                                onInvalid={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("We don't know where to deliver your fruits!")
                                }}
                                onInput={(event) => {
                                    (event.target as HTMLInputElement).setCustomValidity("")
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address line 2</label>
                            <input
                                type="text"
                                value={addressLine2}
                                onChange={handleAddressLine2Change}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                            />
                        </div>

                        {isCompanyNameFilled && (
                            <div className="form-group">
                                <label>Company VAT number</label>
                                <input
                                    type="text"
                                    value={companyVatNumber}
                                    onChange={handleCompanyVatNumberChange}
                                    required

                                    onInvalid={(event) => {
                                        (event.target as HTMLInputElement).setCustomValidity("Company needs a VAT number!")
                                    }}
                                    onInput={(event) => {
                                        (event.target as HTMLInputElement).setCustomValidity("")
                                    }}
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Write comment here</label>
                            <textarea
                                name="comments"
                                id="comments"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <input type="checkbox" id="terms" required={true}
                                       onInvalid={(event) => {
                                           (event.target as HTMLInputElement).setCustomValidity("Accept the terms and conitions!");
                                       }}
                                       onInput={(event) => {
                                           (event.target as HTMLInputElement).setCustomValidity("")
                                       }}
                                />
                            </div>
                            <div style={{flex: 1}}>
                                <label htmlFor="terms"> Terms and conditions</label>
                            </div>
                        </div>

                        <div className={"checkboxes"}>
                            <div>
                                <input type="checkbox" id="marketing"/>
                            </div>
                            <div style={{flex: 1}}>
                                <label htmlFor="marketing"> I accept to receive marketing emails</label>
                            </div>
                        </div>
                        <LoadingIndicator show={isLoading}/>
                        <div>
                            <button className="continue-button" type="submit">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

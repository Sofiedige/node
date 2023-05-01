import { describe, expect, it } from "vitest";
import { useState } from "react";
import { isValidPhoneNumber } from "../src/Components/Billing";

describe("handlePhoneNumberChange", () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = event.target.value;

        if (newPhoneNumber.length === 0) {
            setPhoneNumber("");
        } else if (isValidPhoneNumber(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    };

    it("should update the phone number state when a user types a new number", () => {
        const event: React.ChangeEvent<HTMLInputElement> = {
            target: {
                value: "+123-abcd456-78ahgf90",
            },
        } as React.ChangeEvent<HTMLInputElement>;

        handlePhoneNumberChange(event);

        expect(phoneNumber).toBe("+1234567890");
    });
});

import React, {useState} from "@types/react";

describe("handlePhoneNumberChange", () => {

    const [phoneNumber, setPhoneNumber] = useState<string>("");

    function isValidPhoneNumber(phoneNumber: string): boolean {
        const regex = /^(\+|\d)[0-9]*$/;
        return regex.test(phoneNumber);
    }

    const handlePhoneNumberChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = event.target.value;

        if (newPhoneNumber.length === 0) {
            setPhoneNumber("")

        } else if (isValidPhoneNumber(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    }

    test("should update the phone number state when a user types a new number", async () => {

        const event = {
            target: {
                value: "123-456-7890",
            },
        };

        await handlePhoneNumberChange(event, setPhoneNumber);

        print("ph")
        expect(phoneNumber).toBe("1234567890");
    });
});
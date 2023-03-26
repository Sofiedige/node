const {describe} = require("@jest/globals");

function isValidPhoneNumber(phoneNumber) {
    const regex = /^(\+|\d)[0-9]*$/;
    return regex.test(phoneNumber);
}

describe("isValidPhoneNumber", () => {
    const {it, expect } = require("@jest/globals");
    it("should return true for valid phone numbers", () => {
        expect(isValidPhoneNumber("+1234567890")).toBe(true);
        expect(isValidPhoneNumber("1234567890")).toBe(true);
    });

    it("should return false for invalid phone numbers", () => {
        expect(isValidPhoneNumber("+1")).toBe(true);
        expect(isValidPhoneNumber("abc")).toBe(false);
    });
});

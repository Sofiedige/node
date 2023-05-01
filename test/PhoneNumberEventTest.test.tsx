import { describe, expect, it } from "vitest";
import {isValidPhoneNumber} from "../src/Components/Billing";


describe("isValidPhoneNumber", () => {
    it("returns true for a valid phone number", () => {
        expect(isValidPhoneNumber("+12345678")).toBe(true);
        expect(isValidPhoneNumber("12345678")).toBe(true);
    });

    it("returns false for an invalid phone number", () => {
        expect(isValidPhoneNumber("")).toBe(false);
        expect(isValidPhoneNumber("+")).toBe(false);
        expect(isValidPhoneNumber("12345abc")).toBe(false);
    });
});


import { describe, it, expect } from "vitest";

describe("Function from billing", () => {
    it("should set cityName to 'Søborg' when zipCode is 2860", async () => {
        const newZipCode = "2860";
        let cityName = "";
        try {
            const response = await fetch(
                `https://api.dataforsyningen.dk/postnumre?nr=${newZipCode}`
            );
            const json = await response.json();
            cityName = json[0]?.navn || "";
        } catch {}
        expect(cityName).toBe("Søborg");
    });
});

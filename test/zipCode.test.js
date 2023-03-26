const {describe} = require('@jest/globals')
describe("Function from billing", () => {
    const {it, expect} = require('@jest/globals')
    it("should set cityName to 'Søborg' when zipCode is 2860", async () => {

        const newZipCode = "2860";
        let cityName = "";
        try {
            const response = await fetch(`https://api.dataforsyningen.dk/postnumre?nr=${newZipCode}`);
            const json = await response.json();
            cityName = json[0]?.navn || "";
        } catch {
        }
        expect(cityName).toBe("Søborg");
    });
});
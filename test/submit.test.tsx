import { describe, expect, it } from "vitest";
import App from "../src/App";

function getHandleMySubmitFunction(
    cartItems: Array<{ id: any; quantity: any }>,
    zipCode: string,
    cityName: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    companyName: string,
    companyVatNumber: string,
    addressLine1: string,
    addressLine2: string,
    comment: string,
    total: number,
    navigate: Function,
    setIsLoading: Function
): Function {
    return function handleMySubmit(event: { preventDefault: () => void }) {
        setIsLoading(true);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const cartItemData = cartItems.map((item) => {
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
            price: total,
        };

        const options: RequestInit = {
            method: "POST",
            headers,
            mode: "cors",
            body: JSON.stringify(body),
        };

        fetch("https://eo6qnsie1ivk0gm.m.pipedream.net", options).then(() => {
            setIsLoading(false);
            navigate(event, "continue");
        });
    };
}


describe(App.name, () => {
    it("should render and add an item to the cart and checkout", async () => {

        test('handleMySubmit sends correct data to server', async () => {
            // mock necessary values
            const cartItems = [{id: 1, quantity: 2}];
            const zipCode = '12345';
            const cityName = 'Test City';
            const email = 'test@example.com';
            const firstName = 'John';
            const lastName = 'Doe';
            const phoneNumber = '123456789';
            const companyName = 'Test Company';
            const companyVatNumber = '123456';
            const addressLine1 = 'Test Address 1';
            const addressLine2 = 'Test Address 2';
            const comment = 'Test Comment';
            const total = 123.45;
            const setIsLoading = jest.fn();
            const navigate = jest.fn();
            const fetchMock = jest.fn(() => Promise.resolve());

            // call function with mocked values
            const event = {preventDefault: () => {}};
            const handleMySubmit = getHandleMySubmitFunction(cartItems, zipCode, cityName, email, firstName, lastName, phoneNumber, companyName, companyVatNumber, addressLine1, addressLine2, comment, total, setIsLoading, navigate);
            await handleMySubmit(event);

            // assert that fetch is called with correct arguments
            expect(fetchMock).toHaveBeenCalledWith(
                'https://eo6qnsie1ivk0gm.m.pipedream.net',
                {
                    method: 'POST',
                    headers: expect.any(Headers),
                    mode: 'cors',
                    body: JSON.stringify({
                        zip: '12345',
                        city: 'Test City',
                        email: 'test@example.com',
                        firstName: 'John',
                        sirName: 'Doe',
                        phoneNumber: '123456789',
                        companyName: 'Test Company',
                        companyVatNumber: '123456',
                        cartItem: [{id: 1, quantity: 2}],
                        addressLine1: 'Test Address 1',
                        addressLine2: 'Test Address 2',
                        comment: 'Test Comment',
                        price: 123.45,
                    }),
                },
            );

            // assert that setIsLoading and navigate are called with correct arguments
            expect(setIsLoading).toHaveBeenCalledWith(false);
            expect(navigate).toHaveBeenCalledWith(event, 'continue');
        });
    })
})

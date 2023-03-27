const {describe} = require("@jest/globals");
import {calculateTotal} from "./Basket"

describe("isDiscountIncluded", () => {
    const {it, expect } = require("@jest/globals");
    const cartItems = [{id: 'lemon', quantity: '30'}]
    const storeItems = [{id: 'lemon', price: '10'}]
    const total = calculateTotal(cartItems, storeItems)

    it("", () => {
        expect(total).toBe(270);
        expect(isDiscount).toBe(true)
    });

});




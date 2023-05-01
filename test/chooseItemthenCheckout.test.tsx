import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe(App.name, () => {
    it("should render and add an item to the cart and checkout", async () => {
        render(<App />);
        expect(screen.getByText("Products")).toBeInTheDocument();

        //Click the "Add to cart" button for the first product
        const addToCartButtons = screen.getAllByRole("button", {name: "Add to cart"});
        addToCartButtons[0].click();

        // Wait for the cart to update and display the new item
        await waitFor(() => {
            expect(screen.getByText("Cart Items")).toBeInTheDocument();
            expect(screen.getByText("Lemon")).toBeInTheDocument();
        });

        // Click the "Checkout" button
        await waitFor(() => {
            const checkoutButton = screen.getByRole("button", {name: "Checkout"});
            fireEvent.click(checkoutButton);
        });

        // Wait for the "Checkout" page to load
        await waitFor(() => {
            expect(screen.getByText("Go back to shopping")).toBeInTheDocument();
        });
    });
});

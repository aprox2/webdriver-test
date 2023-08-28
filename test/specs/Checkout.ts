import { expect, browser } from '@wdio/globals';
import {I_ProductData} from "../pageobjects/ProductPage";
const MainPage = require('../pageobjects/MainPage');
const MensShirtPage = require('../pageobjects/ProductListPages/MensPages/MensShirtsPage');
const ProductPage = require('../pageobjects/ProductPage');
const BagPage = require('../pageobjects/BagPage');
const LoginPage = require('../pageobjects/LoginPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');

describe('Checkout flows', () => {

    before('Close cookie banner', async () => {
        await MainPage.open();
        await MainPage.acceptCookies();
    })

    it("Buy first 2 men's shirts", async () => {
        await MainPage.open();
        await MainPage.switchClothingSection('Men')

        await MensShirtPage.open();

        // Selects a product based on the index
        // Then moves to the product screen and compares list data with product view data
        // Adds the product to the bag and moves back to the List screen

        const productData: I_ProductData[] = []

        for (const index of [3, 4]){
            const productDescription = await MensShirtPage.getResultsDescriptionByIndex(index)

            // Add description to list for later comparisons
            productData.push(productDescription);

            await MensShirtPage.openResultByIndex(index);

            let productViewDescription: I_ProductData = await ProductPage.getProductDescription();
            await expect(productDescription.description).toEqual(productViewDescription.description);
            await expect(productDescription.price).toEqual(productViewDescription.price);

            await ProductPage.changeToAvailableProductVariant();
            await ProductPage.productAddToBagBtn.click();
            await ProductPage.waitForAddToBagLoading();

            // If the test failed it's probably here
            // Sometimes the website doesn't allow to add anymore items to bag
            await expect(await ProductPage.bagErrorMessage.isDisplayed()).toEqual(false);
            await ProductPage.waitMiniBagDropdown();
            await browser.back();
        }

        await BagPage.open();
        // Check if all products are shown in bag item area
        for (const product of productData){
            await expect(await BagPage.bagItemContainer.$(`span=${product.price}`).isDisplayed());
            await expect(await BagPage.bagItemContainer.$(`a=${product.description}`).isDisplayed());
        }
        await BagPage.bagCheckoutBtn.click();

        await LoginPage.login();

        // Couldn't test this part, because I can't add items to the basket anymore
        await CheckoutPage.selectDeliveryOption(0);
        await CheckoutPage.addCreditCardBtn.click();
    })
})


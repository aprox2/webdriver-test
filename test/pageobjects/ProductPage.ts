import {$, browser} from '@wdio/globals';
import Page from "./page";
import {cleanProductPrice} from "../../utils/StringManipulators";


export interface I_ProductData{
    description: string;
    price: string;
}

class ProductPage extends Page{

    // No need to update path, because there is no
    // unique url for all products
    constructor() {
        super();
    }

    get productContainer(){return $('section[id="core-product"]')}
    get productDescriptionContainer(){return this.productContainer.$('#pdp-react-critical-app')}
    get productDescriptionTitle(){return this.productDescriptionContainer.$('<h1>')}
    get productCurrentPrice(){return this.productDescriptionContainer.$('span[data-testid="current-price"]')}
    get productAddToBagBtn(){return this.productDescriptionContainer.$('aria/Add to bag')}
    get productAddToBagLoading(){return this.productAddToBagBtn.$('div[role="progressbar"]')}

    get productVariantContainer(){return this.productDescriptionContainer.$('#variantSelector')}
    get productVariantOptions(){return this.productVariantContainer.$$('<option>')}

    get bagErrorMessage(){return this.productDescriptionContainer.$('div[data-testid="bag-error-message"]')}

    async waitForAddToBagLoading(): Promise<void>{
        await browser.waitUntil(async () => {
            return !await this.productAddToBagLoading.isExisting();
        })
    }

    async getProductDescription(): Promise<I_ProductData>{

        const productTitle: string = (await this.productDescriptionTitle.getText()).trim();
        const productPrice: string = cleanProductPrice(await this.productCurrentPrice.getText());

        return {
            description: productTitle,
            price: productPrice,
        }
    }

    // Checks available options and selects the first one
    // These options become disabled if they are Out of stock
    // Check if option is Out of stock if not click it
    async changeToAvailableProductVariant(): Promise<void>{
        await this.productVariantContainer.click();
        const variantOptions = await this.productVariantOptions;

        // Ignore the initial element, it's the "Select product" option
        for (let i = 1; i < variantOptions.length; i++){
            const isDisabled = await variantOptions[i].getAttribute('disabled')
            if (!isDisabled){
                await variantOptions[i].click();
                return
            }
        }
        throw new Error('No option was available')
    }

}

module.exports = new ProductPage();

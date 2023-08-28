import { $ } from '@wdio/globals';
import Page from "./../page";

export interface I_ProductData{
    description: string;
    price: string;
}

// Class that encapsulates all product list type pages
// Every page that has a list of products including search seems to be wrapped
// in the same component. All of them also have a search bar and results container.
// This class wraps around all of these subpages to share common selectors and methods.

export default class ProductListPage extends Page{


    get pageContainer(){return $('#plp')}
    // Not sure about Asos internals, but this looks like it's
    // shared between all pages.
    get resultsContainer(){return this.pageContainer.$('section[data-auto-id="1"]')}
    get resultsList(){return this.resultsContainer.$$('<article>')}
    get filterContainer(){return this.pageContainer.$('aria/Filters')}

    // Product description selectors
    // Uses classnames which is not ideal
    get productDescriptionSelector(){return 'div[class="productDescription_sryaw"'}
    get priceContainerSelector(){return 'p[class="container_wtrEy"]'}

    async getResultsDescriptionByIndex(index: number): Promise<I_ProductData>{
        const results = await this.resultsList;
        const item = results[index];
        const itemDescription = (await item.$(this.productDescriptionSelector).getText()).trim();
        const itemPrice = (await item.$(this.priceContainerSelector).getText()).trim();

        return {
            description: itemDescription,
            price: itemPrice
        }
    }

    async openResultByIndex(index: number): Promise<void>{
        const results = await this.resultsList;
        await results[index].scrollIntoView();
        await results[index].click();
    }

}



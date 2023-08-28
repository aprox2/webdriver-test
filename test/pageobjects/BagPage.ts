import { $ } from '@wdio/globals'
import Page from "./page";
import {I_ProductData} from "./ProductPage";

class BagPage extends Page{

    constructor() {
        super();
        this.path = '/bag/'
    }

    get pageContainer(){return $('#asos-web-bag-react')}
    get bagItemContainer(){return this.pageContainer.$('<bag-item-list>')}
    get bagCheckoutBtn(){return this.pageContainer.$('a=CHECKOUT')}
}

module.exports = new BagPage()

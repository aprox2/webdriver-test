import Page from "./page";
import {$} from '@wdio/globals'

class CheckoutPage extends Page{

    constructor() {
        super();
        this.path = 'https://secure.asos.com/'
    }


    get deliveryOptionsList(){return $('li[class="delivery-option"]')}
    get addCreditCardBtn(){return $('button=Add credit/debit card')}

    async selectDeliveryOption(index: number): Promise<void>{
        await this.deliveryOptionsList[index].click()
    }
}

module.exports = new CheckoutPage()

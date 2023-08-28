import Page from "./page";
import { $ } from "@wdio/globals";
require('dotenv').config();


class LoginPage extends Page{

    constructor() {
        super();
        this.path = 'https://my.asos.com/identity/login/';
    }

    get signInFormContainer(){return $('#signInForm')}
    get emailInput(){return this.signInFormContainer.$('#EmailAddress')}
    get passwordInput(){return this.signInFormContainer.$('#Password')}
    get signInBtn(){return this.signInFormContainer.$('#signin')}

    async login():Promise<void>{
        await this.emailInput.setValue(process.env.USER_EMAIL);
        await this.passwordInput.setValue(process.env.USER_PASSWORD);
        await this.signInBtn.click();
    }

}

module.exports = new LoginPage()

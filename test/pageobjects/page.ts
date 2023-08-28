import { browser, $ } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

export default class Page {

    public path: string
    public subPaths: {[key: string]: string}
    public currentSection: 'men' | 'women'  | null

    constructor() {
        // Default path value
        this.path = '/'
    }

    async open (overwritePath: string | null=null): Promise<void> {
        const targetPath = overwritePath || this.path;
        return await browser.url(targetPath);
    }

    async openSubPath(key: string): Promise<void>{
        return await browser.url(this.subPaths[key])
    }

    // Selectors
    // Cookie banner
    get cookieBannerContainer(){return $('#onetrust-banner-sdk')}
    get cookieBannerAcceptBtn(){return this.cookieBannerContainer.$("button=That's ok")}

    async acceptCookies(): Promise<void>{
        // Wait for seconds for the banner to show up
        // If it doesn't throw only a warning
        // An actual test should cover cookie banner showing up
        try{
            await browser.waitUntil(async (): Promise<boolean> => {
                return await this.cookieBannerContainer.isDisplayed();
            }, {timeout: 4000})
            await this.cookieBannerAcceptBtn.click();
        } catch (error){
            console.warn('Wait for cookie banner timed out')
        }
    }

    // Header
    get pageHeaderContainer(){return $('div[data-testid="header"]')}
    get pageHeaderMENBtn(){return this.pageHeaderContainer.$('a=MEN')}
    get pageHeaderWOMENBtn(){return this.pageHeaderContainer.$('a=WOMEN')}

    // Mini-basket
    get miniBagDropdownContainer(){return this.pageHeaderContainer.$('div[data-testid="minibag-dropdown"]')}

    async waitMiniBagDropdown(): Promise<void>{
        await browser.waitUntil(async (): Promise<boolean> => {
            return await this.miniBagDropdownContainer.isDisplayed();
        })
    }

    async switchClothingSection(switchTo: 'Men' | 'Women'): Promise<void>{
        const { pageHeaderMENBtn, pageHeaderWOMENBtn } = this;
        this.currentSection = switchTo === 'Men' ? 'men' : 'women';
        const selectedBtn = switchTo === 'Men' ? pageHeaderMENBtn : pageHeaderWOMENBtn;
        await selectedBtn.click();
    }

}

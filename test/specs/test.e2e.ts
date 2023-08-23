import { expect, browser } from '@wdio/globals'

describe('My application', () => {
    it('test', async () => {

        await expect(1).toEqual(1);
        await browser.url('');
        await browser.debug();
    })
})


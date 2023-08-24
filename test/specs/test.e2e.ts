import { expect, browser } from '@wdio/globals'

describe('My application', () => {
    it('test', async () => {
        await browser.url('');
        await expect(1).toEqual(1);
    })
})


const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const bundlesPageContinue = "//*[@data-hook='bundles-page_continue']";
const bundlesPageHeading = "//*[@data-hook='bundles-page_page-heading']";

class Bundles{
    async checkRedirectionToBundles(){
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=='Bundles')
        },{timeout:5000})
        await browser.pause(3000);

    }

    async checkBundlesView(){
        return(await $(bundlesPageHeading)=='Select Your Bundle');
    }

    async clickContinueOnBundlesPage(){
        await $(bundlesPageContinue).click();
        await browser.pause(3000);
    }
}

module.exports = new Bundles();
const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const bundlesPageContinue = "//*[@data-hook='bundles-page_continue']";
const bundlesPageHeading = "//*[@data-hook='bundles-page_page-heading']";
const selectBonusBundle = '//button[@data-hook="select-tier-2"]';
const selectTotalBundle = '//button[@data-hook="select-tier-3"]';

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

    async selectBundleType(bundle_type){
        if(await bundle_type=="basic"){
            this.clickContinueOnBundlesPage();
        }
        else if(await bundle_type=='bonus'){
            await $(selectBonusBundle).click();
            this.clickContinueOnBundlesPage();
        }
        else if(await bundle_type=='total'){
            await $(selectTotalBundle).click();
            this.clickContinueOnBundlesPage();
        }
    }

    async clickContinueOnBundlesPage(){
        await $(bundlesPageContinue).click();
        await browser.pause(12000);
    }
}

module.exports = new Bundles();
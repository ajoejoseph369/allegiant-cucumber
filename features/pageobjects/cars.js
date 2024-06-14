const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const continueOnCarsPage = "//button[@data-hook='cars-page_continue']";

class Cars{
    async checkRedirectionToCars(){
        await browser.pause(2000);    
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=="Cars");
        },{timeout:5000})
        await browser.pause(2000);    
    }

    async continueToPaymentsPage(){
        await browser.pause(2000);    
        await $(continueOnCarsPage).click();
        await browser.pause(2000);    
    }
}

module.exports = new Cars();
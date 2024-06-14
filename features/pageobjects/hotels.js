const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const continueOnHotelsPage = "//button[@data-hook='hotels-page_continue']";

class Hotels{
    async checkRedirectionToHotels(){
        await browser.pause(3000);    
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=="Hotels");
        },{timeout:5000})
        await browser.pause(2000);    
    }

    async continueToCarsPage(){
        await browser.pause(2000);    
        await $(continueOnHotelsPage).click();
        await browser.pause(2000);    
    }
}

module.exports = new Hotels();
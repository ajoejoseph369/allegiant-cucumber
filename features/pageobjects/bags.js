const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const continueOnBagsPage = '//button[@data-hook="ancillaries-page_continue-popup"]';
const continueInPopUp = '//button[@data-hook="ancillaries-continue-popup_button_continue"]';

class Bags{
    async checkRedirectionToBags(){
        await browser.pause(2000);    
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=='Bags and Extras');
        },{timeout:5000})
        await browser.pause(2000);    
    }

    async continueToHotelsPage(){
        await browser.pause(2000);    
        await $(continueOnBagsPage).click();
        await $(continueInPopUp).waitForDisplayed();
        await $(continueInPopUp).click();
        await browser.pause(2000);    

    }
}

module.exports = new Bags();
const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const paymentsPagePopUp = "//*[@data-hook='payment-page_ice-popup' and @role='status']";
const paymentsPagePopUpClose = "//button[@data-hook='payment-page_ice-popup_close']";
const paymentsPageHeading = "//*[@data-hook='payment-page_page-heading']";

class Payments{
    async checkRedirectionToPayments(){
        await browser.pause(2000);    
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=="Payment");
        },{timeout:5000})
        await browser.pause(2000);    
    }

    async closePopUpOnPaymentsPage(){
        await browser.pause(2000);    
        if(await $(paymentsPagePopUp).isDisplayed()){
            await $(paymentsPagePopUpClose).click();
        }
        const pageHeading = await $(paymentsPageHeading);
        await browser.pause(2000);
        return(pageHeading =='Review & Payment');
    }
}

module.exports = new Payments();
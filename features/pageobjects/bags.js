const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const continueOnBagsPage = '//button[@data-hook="ancillaries-page_continue-popup"]';
const continueInPopUp = '//button[@data-hook="ancillaries-continue-popup_button_continue"]';
const carryOnBagCount = '//input[@data-hook="ancillaries-page-traveler_0_carry-on"]';
const checkedBagCount = '//input[@data-hook="ancillaries-page-traveler_0_checked-in"]';
const carryOnBagIncrementBtn = '//button[@data-hook="ancillaries-page-traveler_0_carry-on_increment"]';
const checkedBagCountIncrementBtn = '//button[@data-hook="ancillaries-page-traveler_0_checked-in_increment"]';

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
        await browser.pause(4000);
        await $(continueOnBagsPage).click();
        await $(continueInPopUp).waitForDisplayed();
        await $(continueInPopUp).click();
        await browser.pause(2000);    

    }

    async selectBags(carry_on,checked_in){
        const carrybagcount = await $(carryOnBagCount).getValue();;
        const checkedbagcount = await $(checkedBagCount).getValue();
        console.log(`Carry: "${carrybagcount}", Check: ${checkedbagcount}"`);
        while (carrybagcount<carry_on){
            await $(carryOnBagIncrementBtn).click();
        }
        while(checkedbagcount<checked_in){
            await $(checkedBagCountIncrementBtn).click();
        }
    }

}

module.exports = new Bags();
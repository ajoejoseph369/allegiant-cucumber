const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const overlay = '//*[@class="Box-s8oj9r-0 hzaPoz"]';
const closebtn = '//*[@data-hook="overlay-merchandise_ice-pop_close"]';
const cookieBanner = '//*[@id="onetrust-banner-sdk"]';
const acceptAllCookiesBtn = '//*[@id="onetrust-accept-btn-handler"]';
const flightOrigin = '//*[@id="select-origin"]';
const flightDestination = '//*[@id="select-destination"]';
const calendar = "//*[@data-hook='flight-search-date-picker_calendars']";
const datePicker = "//*[@data-hook='flight-search-date-picker_expand-start-date']";
const availableDate = "//*[@class='Day-a047d8-0 iUGdrC']";


class Page{
    async goToPage(){
        await browser.url('https://www.allegiantair.com/');
    }

    async checkOverlayPresence(){
        try{
            return await $(overlay).isDisplayed();
        }
        catch (error){
            return false;
        }
    }

    async closeAlert(){
        if(await this.checkOverlayPresence()){
            await $(closebtn).click();
            console.log('Overlay alert was open and has been closed.');
        } 
        else {
            console.log('Overlay alert was not open.');
        }
    }

    async checkClosureOfOverlay(){
        if(await this.checkOverlayPresence()){
            console.log("Overlay not closed!");
            return false;
        }
        else{
            console.log("Overlay closed!");
            return true;
        }
    }

    async checkCookieDialogue(){
        try{
            return await $(cookieBanner).isDisplayed();
        }
        catch(error){
            return false;
        }
    }

    async acceptCookies(){
        if(this.checkCookieDialogue()){
            await $(acceptAllCookiesBtn).click();
            console.log('Cookies banner displayed and Accepted!');
        }
        else{
            console.log('Cookies banner not displayed!');
        }
    }

    async checkCookieBannerClosure(){
        if(this.checkCookieDialogue()){
            console.log('Cookie banner not closed!');
            return false;
        }
        else{
            console.log('Cookie banner closed!');
            return true;
        }
    }

    async selectOrigin(origin){
        await $(flightOrigin).setValue(origin);
        await browser.keys([Key.Enter]);
    }

    async selectDestination(destination){
        await $(flightDestination).waitForEnabled({timeout: 3000});
        await $(flightDestination).setValue(destination);
        await browser.keys([Key.Enter]);
        await browser.pause(3000);
    }

    async selectFirstAvailableDate(){
        await $(datePicker).click();
        await $(calendar).isDisplayed();
        const buttons = await $$('.Day-a047d8-0 iUGdrC');
        for(const button of buttons){
            if(await button.isEnabled()){
                await button.click();
                break;
            }
        }
        await browser.pause(4000);
    }
}

module.exports = new Page();    
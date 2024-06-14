const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const legroomSeatsId = "//li/button[span[contains(@data-hook, 'select-legroom-plus-seat_front_')]]";
const economySeatsId = "//li/button[span[contains(@data-hook, 'select-economy-seat_unrestricted_')]]";
const legroomPlusExitSeatsId = "//li/div/button[div[span[contains(@data-hook, 'select-legroom-plus-seat_exit-row_')]]]";
const returnSeat = '//button[@data-hook="seats-select-returning"]';
const seatsPagePopUp = "//*[@data-hook='seats-page-continue-button-popup']";
const continueOnSeatsPagePopUp = "//button[@data-hook='seats-page_continue-popup']";
const continueOnSeatsPage = "//button[@data-hook='seats-page_continue']";

class Seats{
    async checkRedirectionToSeats(){
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=='Seats')
        },{timeout:5000})
        await browser.pause(3000);
    }

    async selectAvailableSeats(seat_type){
        let count = 0;
        
        let seats = "";
        if(seat_type=="Legroom"){
            const legroomSeats = await $$(legroomSeatsId);
            seats = legroomSeats;

        }
        else if(seat_type=="Economy"){
            const economySeats = await $$(economySeatsId);
            seats = economySeats;
        }
        else if(seat_type=="Legroom plus exit"){
            const legroomPlusExitSeats = await $$(legroomPlusExitSeatsId);
            seats = legroomPlusExitSeats;
        }
        
        for(const seat of seats){
            await seat.isDisplayed();
            if(await seat.isClickable()){
                const span = await seat.$('span');
                const ariaLabel = await span.getAttribute('aria-label');
                console.log(`Button with label "${ariaLabel}" is enabled`);
                await seat.click();
                await browser.pause(5000);
                break;
            }
        }

    }
    
    async bookReturnSeat(seat_type){
        await $(returnSeat).click();
        await browser.pause(6000);
        this.selectAvailableSeats(seat_type); 
        await browser.pause(5000);    
        await $(continueOnSeatsPage).click();
        await browser.pause(10000);    
    }
}

module.exports = new Seats();
const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const overlay = '//*[@data-hook="overlay-merchandise_ice-pop_content"]';
const closebtn = '//*[@data-hook="overlay-merchandise_ice-pop_close"]';
const cookieBanner = '//*[@id="onetrust-banner-sdk"]';
const acceptAllCookiesBtn = '//*[@id="onetrust-accept-btn-handler"]';
const flightOrigin = '//*[@id="select-origin"]';
const flightDestination = '//*[@id="select-destination"]';
const Calendar = "//*[@data-hook='flight-search-date-picker_calendars']";
const DatePicker = "//*[@data-hook='flight-search-date-picker_expand-start-date']";
const dateButtons = 'button[data-hook^="flight-search-date-picker_calendar-0_select-day-"]';
const flightSearchButton = "//button[@data-hook='flight-search-submit']";
const flightSearchContinueButton = "//button[@data-hook='flights-page_continue']";
const flightsPageHeading = "//*[@data-hook='flights-page_page-heading']";
const bundlesPageContinue = "//*[@data-hook='bundles-page_continue']";
const bundlesPageHeading = "//*[@data-hook='bundles-page_page-heading']";
const firstName = "//*[@data-hook='travelers-form_adults_0_first-name']";
const middleName = "//*[@data-hook='travelers-form_adults_0_middle-name']";
const lastName = "//*[@data-hook='travelers-form_adults_0_last-name']";
const suffix = "//div[@data-hook='travelers-form_adults_0_suffix']";
const suffixOption = "//div[@id='react-select-adults.0.suffix-option-3']";
const genderM = "//label[@data-hook='travelers-form_adults_0_gender_MALE']";
const dobMonth = "//input[@id='adults.0.dob-month']";
const dobDay = "//input[@id='adults.0.dob-day']";
const dobYear = "//input[@id='adults.0.dob-year']";
const phonePrefix = "//input[@id='adults.0.primary-phone-prefix']";
const phoneNumber = "//input[@data-hook='travelers-form_adults_0_primary-phone-number']";
const emailId = "//input[@data-hook='travelers-form_adults_0_email']";
const travellersPageContinueButton = "//button[@data-hook='travelers-page_continue']";
const legroomSeatsId = "//li/button[span[contains(@data-hook, 'select-legroom-plus-seat_front_')]]";
const economySeatsId = "//li/button[span[contains(@data-hook, 'select-economy-seat_unrestricted_')]]";
const legroomPlusExitSeatsId = "//li/div/button[div[span[contains(@data-hook, 'select-legroom-plus-seat_exit-row_')]]]";
const returnSeat = "//button[@data-hook='seats-page-tabs_returning']";
const continueOnSeatsPage = "//button[@data-hook='seats-page_continue-popup']";

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

    async selectAvailableDates(){
        await $(DatePicker).click();
        await $(Calendar).isDisplayed();
        const buttons = await $$(dateButtons);
        let count = 0;
        for(const button of buttons){
            console.log(`Count: "${count}"`);
            await button.isDisplayed();
            if(await button.isClickable()){
                const ariaLabel = await button.getAttribute('aria-label');
                console.log(`Button with label "${ariaLabel}" is enabled!`);
                await button.click();
                await browser.pause(3000);
                count = count + 1;
                if(count==2)
                {
                    break;
                }
            }
        }
    }

    async searchFlightsBtnClick(){
        await $(flightSearchButton).click();
    }

    async checkRedirectionToResults(){
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return (title=="Flights")
        },{timeout:5000})
    }

    async clickContinueOnFlightsPage(){
        await $(flightSearchContinueButton).click();
        await browser.pause(3000);
    }

    async checkResultsView(){
        return(await $(flightsPageHeading)=='Select Flights');
    }

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

    async checkRedirectionToTravellers(){
        await browser.waitUntil(async ()=>{
            const title = await browser.getTitle();
            console.log(title);
            return(title=='Travelers')
        },{timeout:5000})
        await browser.pause(3000);
    }

    async fillTravellerDetails(){
        await $(firstName).setValue("Ajoe");
        await $(middleName).click();
        await $(middleName).setValue("PTen");
        await $(lastName).click();
        await $(lastName).setValue("Joseph");
        await $(suffix).click();
        await $(suffixOption).waitForDisplayed();
        await $(suffixOption).click();
        await $(genderM).click();
        await $(dobMonth).setValue("January");
        await browser.keys([Key.Enter]);
        await $(dobDay).setValue("7");
        await browser.keys([Key.Enter]);
        await $(dobYear).setValue("2001");
        await browser.keys([Key.Enter]);
        await $(phonePrefix).setValue("IN (+91)");
        await browser.keys([Key.Enter]);
        await $(phoneNumber).setValue("8304033184");
        await $(emailId).setValue("ajoejoseph99@gmail.com");
        await $(travellersPageContinueButton).click();   
        await browser.pause(8000);
    }

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
        const legroomSeats = await $$(legroomSeatsId);
        const economySeats = await $$(economySeatsId);
        const legroomPlusExitSeats = await $$(legroomPlusExitSeatsId);
        
        let seats = "";
        if(seat_type=="Legroom"){
            seats = legroomSeats;

        }
        else if(seat_type=="Economy"){
            seats = economySeats;
        }
        else if(seat_type=="Legroom plus exit"){
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
        await returnSeat.waitForEnabled({timeout: 3000});
        await returnSeat.click();
        this.selectAvailableSeats(seat_type); 
        await continueOnSeatsPage.click();
        await browser.pause(5000);    
    }
}

module.exports = new Page();    

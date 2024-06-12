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
const suffix = "//*[@data-hook='travelers-form_adults_0_suffix']";
const genderM = "//input[@type='radio' and @value='MALE']";
const dobMonth = "//input[@id='adults.0.dob-month']";
const dobDay = "//input[@id='adults.0.dob-day']";
const dobYear = "//input[@id='adults.0.dob-year']";
const phonePrefix = "//input[@id='adults.0.primary-phone-prefix']";
const phoneNumber = "//input[@data-hook='travelers-form_adults_0_primary-phone-number']";
const emailId = "//input[@data-hook='travelers-form_adults_0_email']";
const travellersPageContinueButton = "//button[@data-hook='travelers-page_continue']";




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
        await $(middleName).setValue("P10");
        await $(lastName).click();
        await $(lastName).setValue("Joseph");
        await $(suffix).setValue("Jr.");
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
        await browser.pause(3000);
    }
}

module.exports = new Page();    

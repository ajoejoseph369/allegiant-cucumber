const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

const flightSearchContinueButton = "//button[@data-hook='flights-page_continue']";
const flightsPageHeading = "//*[@data-hook='flights-page_page-heading']";

class Flights{
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

}

module.exports = new Flights();
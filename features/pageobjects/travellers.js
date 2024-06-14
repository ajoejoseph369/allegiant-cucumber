const {$} = require('@wdio/globals');
const {Key} = require('webdriverio');

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

class Travellers{
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
}

module.exports = new Travellers();
const { Given, When, Then } = require('@wdio/cucumber-framework');

const Page = require("../pageobjects/page.js");


//overlay promotion
Given(/^user is on the homepage$/, async () => {
	await Page.goToPage();
});

When(/^user is displayed with an overlay$/, async() => {
	await Page.checkOverlayPresence();
});

When(/^user clicks close button$/, async () => {
    await Page.closeAlert();
});

Then(/^overlay alert is closed$/, () => {
	return (Page.checkClosureOfOverlay());
});

//cookies acceptance


Given(/^user is already on the homepage$/, async () => {
	return true;
});


When(/^user is asked to accept cookies$/, async () => {
	await Page.checkCookieDialogue();
});

When(/^user clicks Accept cookies$/, async () => {
	await Page.acceptCookies();
});

Then(/^cookies banner is closed$/, async () => {
	await Page.checkCookieBannerClosure();
});


//flight search

When(/^user selects (.*) for Departure Airport$/, async (origin) => {
	await Page.selectOrigin(origin);
});

Then(/^user selects (.*) for Destination Airport$/, async (destination) => {
	await Page.selectDestination(destination);
});


Then(/^user selects first available date$/, async () => {
	await Page.selectFirstAvailableDate();
});


Then(/^success$/, async () => {
	return true;
});

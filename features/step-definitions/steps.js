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


Then(/^user selects available dates for both origin and destination$/, async () => {
	await Page.selectAvailableDates();
});


Then(/^user is redirected to results page$/, async () => {
	await Page.searchFlightsBtnClick();
	await Page.checkRedirectionToResults();
});


//flight search results

Given(/^user is on the flight results page$/, async () => {
	await Page.checkRedirectionToResults();
});

When(/^user is displayed with flight details$/, async () => {
	await Page.checkResultsView();
});

Then(/^user clicks continue$/, async () => {
	await Page.clickContinueOnFlightsPage();
	await Page.checkRedirectionToBundles();
});

//bundles

Given(/^user is on the bundles page$/, async () => {
	await Page.checkRedirectionToBundles();
});

When(/^user is displayed with bundle options$/, async () => {
	await Page.checkBundlesView();
});

Then(/^user clicks continue to select basic$/, async () => {
	await Page.clickContinueOnBundlesPage();
	await Page.checkRedirectionToTravellers();
});

//travellers


Given(/^user is on the passenger details page$/, async () => {
	await Page.checkRedirectionToTravellers();
});

When(/^user enters details and clicks continue$/, async () => {
	await Page.fillTravellerDetails();
});

Then(/^user is redirected to the next page$/, async () => {
	return true;
});

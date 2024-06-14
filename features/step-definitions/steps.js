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
	await Page.checkRedirectionToSeats();
});

//Seats


Given(/^user is on the seats page$/, async () => {
	await Page.checkRedirectionToSeats();
});

When(/^user selects a (.*) seat$/, async (seat_type) => {
	await Page.selectAvailableSeats(seat_type);
});

Then(/^user selects a (.*) seat for return journey$/, async (seat_type) => {
	await Page.bookReturnSeat(seat_type);
});

Then(/^user clicks continue to go to bags page$/, async () => {
	await Page.checkRedirectionToBags();
});

//Bags and Extras


Given(/^user is on the bags page$/, async () => {
	await Page.checkRedirectionToBags();
});

When(/^user clicks continue on bags page$/, async () => {
	await Page.continueToHotelsPage();
});

Then(/^user is redirected to hotels page$/, async () => {
	await Page.checkRedirectionToHotels();
});

//Hotels


Given(/^user is on the hotels page$/, async () => {
	await Page.checkRedirectionToHotels();
});

When(/^user clicks on continue on hotels page$/, async () => {
	await Page.continueToCarsPage();
});

Then(/^user is redirected to cars page$/, async () => {
	await Page.checkRedirectionToCars();;
});

//Cars


Given(/^user is on the cars page$/, async () => {
	await Page.checkRedirectionToCars();
});

When(/^user clicks on continue on cars page$/, async () => {
	await Page.continueToPaymentsPage();
});

Then(/^user is redirected to Payments page$/, async () => {
	await Page.checkRedirectionToPayments();
});


//Payments


Given(/^user is on the payments page$/, async () => {
	await Page.checkRedirectionToPayments();
});

Then(/^user is displayed with the payment details$/, async () => {
	await Page.closePopUpOnPaymentsPage();
});


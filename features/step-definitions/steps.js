const { Given, When, Then } = require('@wdio/cucumber-framework');

const Page = require("../pageobjects/page.js");
const Flights = require("../pageobjects/flights.js");
const Bundles = require("../pageobjects/bundles.js");
const Travellers = require("../pageobjects/travellers.js");
const Seats = require("../pageobjects/seats.js");
const Bags = require("../pageobjects/bags.js");
const Hotels = require("../pageobjects/hotels.js");
const Cars = require("../pageobjects/cars.js");
const Payments = require("../pageobjects/payments.js");

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
	await Flights.checkRedirectionToResults();
});


//flight search results

Given(/^user is on the flight results page$/, async () => {
	await Flights.checkRedirectionToResults();
});

When(/^user is displayed with flight details$/, async () => {
	await Flights.checkResultsView();
});

Then(/^user clicks continue$/, async () => {
	await Flights.clickContinueOnFlightsPage();
	await Bundles.checkRedirectionToBundles();
});

//bundles

Given(/^user is on the bundles page$/, async () => {
	await Bundles.checkRedirectionToBundles();
});

When(/^user is displayed with bundle options$/, async () => {
	await Bundles.checkBundlesView();
});


Then(/^user selects (.*) as bundle$/, async (bundle_type) => {
	await Bundles.selectBundleType(bundle_type);
});

//travellers

Given(/^user is on the passenger details page$/, async () => {
	await Travellers.checkRedirectionToTravellers();
});

When(/^user enters details and clicks continue$/, async () => {
	await Travellers.fillTravellerDetails();
});

Then(/^user is redirected to the next page$/, async () => {
	await Seats.checkRedirectionToSeats();
});

//Seats


Given(/^user is on the seats page$/, async () => {
	await Seats.checkRedirectionToSeats();
});

When(/^user selects a (.*) seat$/, async (seat_type) => {
	await Seats.selectAvailableSeats(seat_type);
});

Then(/^user selects a (.*) seat for return journey$/, async (seat_type) => {
	await Seats.bookReturnSeat(seat_type);
});

Then(/^user clicks continue to go to bags page$/, async () => {
	await Bags.checkRedirectionToBags();
});

//Bags and Extras


Given(/^user is on the bags page$/, async () => {
	await Bags.checkRedirectionToBags();
});


When(/^user selects (.*) carry-on bags and (.*) checked-in bags$/, async (carry_on,checked_in) => {
	await Bags.selectBags(carry_on,checked_in);
});


When(/^user clicks continue on bags page$/, async () => {
	await Bags.continueToHotelsPage();
});

Then(/^user is redirected to hotels page$/, async () => {
	await Hotels.checkRedirectionToHotels();
});

//Hotels


Given(/^user is on the hotels page$/, async () => {
	await Hotels.checkRedirectionToHotels();
});

When(/^user clicks on continue on hotels page$/, async () => {
	await Hotels.continueToCarsPage();
});

Then(/^user is redirected to cars page$/, async () => {
	await Cars.checkRedirectionToCars();;
});

//Cars


Given(/^user is on the cars page$/, async () => {
	await Cars.checkRedirectionToCars();
});

When(/^user clicks on continue on cars page$/, async () => {
	await Cars.continueToPaymentsPage();
});

Then(/^user is redirected to Payments page$/, async () => {
	await Payments.checkRedirectionToPayments();
});


//Payments


Given(/^user is on the payments page$/, async () => {
	await Payments.checkRedirectionToPayments();
});

Then(/^user is displayed with the payment details$/, async () => {
	await Payments.closePopUpOnPaymentsPage();
});


#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

//get arg

const args = minimist(process.argv.slice(2));

// display messages

if (args.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit. `);
	process.exit(0);
}

// extracts system timezone

const timezone = moment.tz.guess();

// make and set latitude and longitude

let latitude;
if (args.n) {
	latitude = args.n;
} else if (args.s) {
	latitude = -args.s;
}

let longitude;
if (args.e) {
	longitude = args.e;
} else if (args.w) {
	longitude = -args.w;
}

// Make a request

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&timezone=' + timezone)

// Get the data from the request

const data = await response.json();

// make days

const days = args.d;

// create extra response text

if (days == 0) {
	console.log("today.")
	if (data.daily.precipitation_hours[days] = 0) {
		console.log("Don't bring your umbrella");
	} else {
		console.log("Bring your umbrella");
	}
} else if (days > 1) {
  	console.log("in " + days + " days.")
	if (data.daily.precipitation_hours[days] = 0) {
		console.log("Don't bring your umbrella");
	} else {
		console.log("Bring your umbrella");
	}
} else {
 	console.log("tomorrow.")
	if (data.daily.precipitation_hours[days] = 0) {
		console.log("Don't bring your umbrella");
	} else {
		console.log("Bring your umbrella");
	}
}

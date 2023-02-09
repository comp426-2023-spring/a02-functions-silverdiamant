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

const longitude = args.e || args.w * -1;
const latitude = args.n || args.s * -1;

// Make a request

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone)

// Get the data from the request

const data = await response.json();

// make days

const days = args.d;

// if j, exit

if (args.j) {
	console.log(data);
	if (!latitude) {
		console.log("Latitude must be in range");
	}
	process.exit(0);
}

// create extra response text

if (days == 0) {
	console.log("today.")
	if (data.daily.precipitation_hours[0] = 0) {
		console.log("Don't bring your umbrella");
	} else {
		console.log("Bring your umbrella");
	}
} else if (days == 1) {
 	console.log("tomorrow.")
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
} 

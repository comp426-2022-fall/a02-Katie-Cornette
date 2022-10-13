#!/usr/bin/env node

import fetch from 'node-fetch'; 
import minimist from 'minimist';
import moment from 'moment-timezone'; 

 
const args = minimist(process.argv.slice(2))

if (args.h){
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
	
	-h            Show this help message and exit.
    	-n, -s        Latitude: N positive; S negative.
	-e, -w		Longitude: E postive; W negative.
	-z		Time zone: uses tz.guess() from moment-timezone by default.
	-d 0-6		Day to retrieve weather: 0 is today; defaults to 1.
	-j		Echo pretty JSON from open-meteo API and exit.
	`); 
	process.exit(0); 

}  
const timezone = args.z ? args.z:moment.tz.guess();
var latitude = args.n || (args.s * -1); 
var longitude = args.e || (args.w * -1);
var day = args.d ? args.d : 1; 
  
const URL = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&timezone=' + timezone;

const response = await fetch(URL); 

const data = await response.json();
if(args.j){ 
	console.log(data);
	process.exit(0);
}

const precip = data.daily.precipitation_hours[day];

if(precip == 0){
        console.log("You will not need your galoshes ");
}
else{
        console.log("You will need your galoshes ");
} 
// -d command
const days = args.d; 
if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + day + " days.")
} else {
  console.log("tomorrow.")
}

console.log(data); 
 

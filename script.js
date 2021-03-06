//creating object using prototype without constructor
let Vehicle = {
	manufacturer:	"VAG",
	model:			"prototype",
	year:			"2000",
	averageSpeed:	160,

	getInfo: function() {
		return (`----Info about vehicle:----\n
		manufacturer: ${this.manufacturer}\n
		model: ${this.model}\n
		year: ${this.year}\n
		average speed:	${this.averageSpeed}`);
	},

	getTransferTime: function(distance) {
		let estimatedTime = distance/this.averageSpeed;
		estimatedTime += Math.trunc(estimatedTime / 4);
		return estimatedTime.toFixed(1);
	},
};

let exampleCar = Object.create(Vehicle);
exampleCar.manufacturer = 'Renault';
exampleCar.model = 'Logan MCV';
exampleCar.year = '2018';
exampleCar.averageSpeed = 90;

function showCarInfo() {
	alert(exampleCar.getInfo());
}

function calcTransferTime() {
	const routeDistance = +prompt('Enter distance in km please:');
	alert(`Your transfer takes about ${exampleCar.getTransferTime(routeDistance)} hours`);
}

//creating object using constructor:
function Fraction(numerator, denominator) {
	this.numerator = numerator;
	this.denominator = denominator;
	this.cancel = function() {
		const fractionGCD = euclideanGCD(this.numerator, this.denominator);
		this.numerator /= fractionGCD;
		this.denominator /= fractionGCD;
	}
}

function euclideanGCD(firstNum, secondNum) {
	let buf1 = firstNum;
	let buf2 = secondNum;
	while (buf2 !== 0) {
		let temp = buf2;
		buf2 = buf1 % buf2;
		buf1 = temp;
	};
	return buf1;
}

let fractions = [];
let commonDenominator;
let reductedToCommonFractions = [];

function initFractions(amount = 2) {
	for (let i = 1; i <= amount; i++) {
		let numerator = +prompt(`Type numerator of fraction #${i}`);
		let denominator = +prompt(`Type denominator of fraction #${i}`);
		let newFraction = new Fraction(numerator, denominator);
		newFraction.cancel();
		fractions.push(newFraction);
	};
	reductedToCommonFractions = reductToCommonDenominator(fractions[0], fractions[1]);
}

function reductToCommonDenominator(fraction1, fraction2) {
	const leastCommonMultiple = 
		Math.abs(fraction1.denominator * fraction2.denominator) 
		/ euclideanGCD(fraction1.denominator, fraction2.denominator);
	
	commonDenominator = leastCommonMultiple;
	return [
		new Fraction (
			fraction1.numerator * leastCommonMultiple / fraction1.denominator,
			leastCommonMultiple
		),
		new Fraction (
			fraction2.numerator * leastCommonMultiple / fraction2.denominator,
			leastCommonMultiple
		)
	];
}

function addFractions() {
	const resultFract = new Fraction (
		reductedToCommonFractions[0].numerator + reductedToCommonFractions[1].numerator,
		commonDenominator
	);
	alert(`Adiing your's fractions gives ${resultFract.numerator} / ${resultFract.denominator}`);
}

function substractFractions() {
	const resultFract = new Fraction (
		reductedToCommonFractions[0].numerator - reductedToCommonFractions[1].numerator,
		commonDenominator
	);
	alert(`Substacting your's fractions gives ${resultFract.numerator} / ${resultFract.denominator}`);
}

function multiplyFractions() {
	const resultFract = new Fraction (
		fractions[0].numerator * fractions[1].numerator,
		fractions[0].denominator * fractions[1].denominator
	);
	alert(`Multiplying your's fractions gives ${resultFract.numerator} / ${resultFract.denominator}`);
}

function divideFractions() {
	const resultFract = new Fraction (
		fractions[0].numerator * fractions[1].denominator,
		fractions[0].denominator * fractions[1].numerator
	);
	alert(`Dividing your's fractions gives ${resultFract.numerator} / ${resultFract.denominator}`);
}

function cancelFraction() {
	let numer = +prompt(`Type numerator of fraction`);
	let denomin = +prompt(`Type denominator of fraction`);
	let testFraction = new Fraction(numer, denomin);
	testFraction.cancel();
	alert(`Cancelled fractions gives ${testFraction.numerator} / ${testFraction.denominator}`);
}

//-------------------------------
let Time = {
	hours: 			0,
	minutes:		0,
	seconds:		0,

	display: function() {
		alert(`Current time is ${this.hours} : ${this.minutes} : ${this.seconds}`);
	},

	addSeconds: function(secondsAmount) {
		if (Math.abs(secondsAmount) > 60) {
			this.addMinutes(
				Math.trunc(secondsAmount / 60)
			);
			this.seconds += secondsAmount % 60;
		} else {
			this.seconds += secondsAmount;
		};
		if (this.seconds >= 60) {
			this.minutes++;
			this.seconds = this.seconds - 60;
		};
	},

	addMinutes: function(minutesAmount) {
		if (Math.abs(minutesAmount) > 60) {
			this.addHours(
				Math.trunc(minutesAmount / 60)
			);
			this.minutes += minutesAmount % 60;
		} else {
			this.minutes += minutesAmount;
		};
		if (this.minutes >= 60) {
			this.addHours(1);
			this.minutes = this.minutes - 60;
		};
	},

	addHours: function(hoursAmount) {
		if (Math.abs(hoursAmount) > 24) {
			if (Math.trunc(hoursAmount / 24) > 1) {
				this.hours += hoursAmount % 24;
			} else {
				this.hours += Math.sign(Math.abs(hoursAmount) - 24);
			}
			
		} else {
			this.hours = this.hours + hoursAmount;
		};
		if (this.hours >= 24) {
			this.hours = this.hours - 24;
		};
	},
}

let timeStamp = Object.create(Time);
function initTime() {
	const hr = +prompt('Type hours, please');
	const min = +prompt('Type minutes, please');
	const sec = +prompt('Type seconds, please')
	
	timeStamp.addHours(hr);
	timeStamp.addMinutes(min);
	timeStamp.addSeconds = sec;
	timeStamp.display();
}

function adjustSeconds() {
	timeStamp.addSeconds(+prompt('Type seconds to adjust, please'));
	timeStamp.display();
}

function adjustMinutes() {
	timeStamp.addMinutes(+prompt('Type minutes to adjust, please'));
	timeStamp.display();
}

function adjustHours() {
	timeStamp.addHours(+prompt('Type hours to adjust, please'));
	timeStamp.display();
}
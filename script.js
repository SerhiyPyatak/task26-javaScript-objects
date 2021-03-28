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

const fractions = [];
let commonDenominator;
function initFractions(amount = 2) {
	for (let i = 1; i <= amount; i++) {
		let numerator = +prompt(`Type numerator of fraction #${i}`);
		let denominator = +prompt(`Type denominator of fraction #${i}`);
		let newFraction = new Fraction(numerator, denominator);
		fractions.push(newFraction);
	};
	commonDenominator = reductToCommonDenominator(fractions[0], fractions[1]);
}

function reductToCommonDenominator(fraction1, fraction2) {
	const denominator1 = fraction1.denominator;
	const denominator2 = fraction2.denominator;
	const leastCommonMultiple = Math.abs(denominator1 * denominator2) / euclideanGCD(denominator1, denominator2);
	fraction1.numerator *= leastCommonMultiple / fraction1.denominator;
	fraction2.numerator *= leastCommonMultiple / fraction2.denominator;
	fraction1.denominator = leastCommonMultiple;
	fraction2.denominator = leastCommonMultiple;

	return leastCommonMultiple;
}

function addFractions() {
	const resultFract = new Fraction (
		fractions[0].numerator + fractions[1].numerator,
		commonDenominator
	);
	alert(`Adiing your's fractions gives ${resultFract.numerator} / ${resultFract.denominator}`);
}
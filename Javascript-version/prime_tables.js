// a avriable retaining if we are in testing or production mode
var testingModeActivated = false;


function start () {
	// verify input
	if ( verifyN() ) {
		// get input
		var n = getN();

		// the set of prime numbers that are looking for
		var primes = [];
		// the set of natural numbers
		var naturals = [];
		//start computation
		var nbIteration = 1;
		do {
			initNaturals( naturals, 100 * nbIteration  );
			nbIteration++;
		} while ( nbIteration < n );


	}
}

/* ========================================
 *	Functions related to the display of the current mode
 * ========================================
 */
function changeToTesting () {
	if ( !testingModeActivated ) {
		// changing the application mode
		testingModeActivated = true;
		// changing the buttons colors using a REGEX
		var buttonWork = document.getElementById( 'toggle-work' );
		buttonWork.className = buttonWork.className.replace( /(?:^|\s)btn-info(?!\S)/g , ' btn-default' );
		var buttonTest = document.getElementById( 'toggle-test' );
		buttonTest.className = buttonTest.className.replace( /(?:^|\s)btn-default(?!\S)/g , ' btn-warning' );
		/* REGEX explanation ------------------------------
		 * 	(?:^|\s) 	Match the start of the string, or any single whitespace character
		 * 	btn-xxx		The classname we want to replace
		 *	(?!\S)		Match the end of the string or a whitespace character
		 * => Makes sure we select only the clasname interesting us, and not a similar classname including the bit that we are loooking for
		 */
	}
}

function changeToComputing () {
	if ( testingModeActivated ) {
		// changing the application mode
		testingModeActivated = false;
		// changing the buttons colors using a REGEX
		var buttonWork = document.getElementById( 'toggle-work' );
		buttonWork.className = buttonWork.className.replace( /(?:^|\s)btn-default(?!\S)/g , ' btn-info' );
		var buttonTest = document.getElementById( 'toggle-test' );
		buttonTest.className = buttonTest.className.replace( /(?:^|\s)btn-warning(?!\S)/g , ' btn-default' );
	}
}

/* ========================================
 *	Functions related to the input
 * ========================================
 */
/* shows or hide an error message related to the content of the input field */
function displayErrorMessage ( correctInput ) {
	var errorMessage = document.getElementById( 'error-input-msg' );
	if ( correctInput === true ) {
		errorMessage.classList.add( 'hidden' );
	} else if ( correctInput === false ) {
		errorMessage.classList.remove( 'hidden' );
	}
}

/* gets the content of the input field, or a default value, recording if the field was correctly filled or not */
function getN () {
	var n = 1;
	var nCorrect = false;
	if ( verifyN() ) {
		nCorrect = true;
		n = document.getElementById( 'input-n' ).value;
	}
	return { value: n, continue: nCorrect }
}

/* checks if the input field is correctly filled or not */
function verifyN () {
	var correctInput = false;
	var potentialN = document.getElementById( 'input-n' ).value;
	if ( potentialN ) { // exists
		if ( ! isNaN( potentialN )  ) { // is a number
			if ( potentialN % 1 === 0 ) { // is an integer
				if ( potentialN > 0 ) { // is greater than 0
					correctInput = true;
				}
			}
		}
	}
	displayErrorMessage( correctInput );
	return correctInput;
}

/* ========================================
 *	Functions related to the computation
 * ========================================
 */
/* fills a table with natural numbers greater than 1 associated with a boolean value */
function initNaturals ( naturalsArray, lengthValue ) {
	// starting to fill with 1 or the next value needed to complete the array
	var startIndex = 2;
	var endIndex = lengthValue + 2;
	// pushing the indexes further if table is already filled
	if ( naturalsArray.length ) {
		// getting the last number of the array
		startIndex = naturalsArray[ naturalsArray.length - 1 ].number + 1;
	}
	for ( i = startIndex; i < endIndex; i++ ) {
		// adding a new number at the end of the table
		naturalsArray.push( { number: i, isPrime: true } );
	}
	return naturalsArray;
}

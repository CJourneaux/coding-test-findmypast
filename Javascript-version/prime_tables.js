var testingModeActivated = false;

function start () {
	// verify input
	if ( verifyN() ) {
		// get input
		var n = getN();
		//start computation

		// the set of prime numbers that we found
		var primes = [];
		// the set of natural numbers
		var naturals = [];

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
function displayErrorMessage ( correctInput ) {
	var errorMessage = document.getElementById( 'error-input-msg' );
	if ( correctInput === true ) {
		errorMessage.classList.add( 'hidden' );
	} else if ( correctInput === false ) {
		errorMessage.classList.remove( 'hidden' );
	}
}

function getN () {
	var n = 1;
	var nCorrect = false;
	if ( verifyN() ) {
		nCorrect = true;
		n = document.getElementById( 'input-n' ).value;
	}
	return { value: n, continue: nCorrect }
}

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

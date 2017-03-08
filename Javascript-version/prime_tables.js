// a avriable retaining if we are in testing or production mode
var testingModeActivated = false;
// the set of prime numbers that are looking for
var primes = [];
// the set of natural numbers
var naturals = [];

function start () {
	// verify input
	if ( verifyN() ) {
		// get input
		var n = getN();

		// updating the progressbar
		displayProgressBar( true, n.value );

		//start computation
		var stepLength = 0;
		var nbIteration = 1;
		var keepSieving = true;
		while ( keepSieving ) {
			// start index for the current step /!\ less than the actual number
			var indexStart = stepLength;
			// increasing the set of natural numbers by x for this step
			var stepLength = 100 * nbIteration;
			naturals = initNaturals( naturals, stepLength );
			// removing previous multiples if necessary
			eratosthenesSievePastPrimeFound();
			// selecting primes through the natural numbers
			keepSieving = eratosthenesSieve( indexStart, n.value );
			// preparing for the next step if necessary
			nbIteration++;
		}

		displayTable();
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
 *	Functions related to the progressbar
 * ========================================
 */
/* shows or hide the progress bar */
function displayProgressBar ( appear, max ) {
	var progressBarZone = document.getElementById( 'progress-bar-zone' );
	if ( appear ) { // start => show and intialise the display of the progressbar
		progressBarZone.classList.remove( 'hidden' );
	} else {
		progressBarZone.classList.remove( 'hidden' );
	}
	var progressBar = document.getElementById( 'progress-bar' );
	progressBar.setAttribute( 'aria-valuemax', max );
}

function updateProgressBar ( progress, max ) {
	var progressBar = document.getElementById( 'progress-bar' );
	progressBar.setAttribute( 'aria-valuenow', progress );
	var percent = Math.round( progress / max * 100 );
	progress.style = "width: " + percent + "%"
	var progressBarHelp = document.getElementById( 'progress-bar-help' );
	progressBarHelp.innerHTML = "" + progress + " prime numbers found";
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
	var startIndex = 0;
	var endIndexPlus = lengthValue;
	// pushing the indexes further if table is already filled
	if ( naturalsArray.length ) {
		// getting the last number of the array
		// -2 because numbers are greater than indexes
		// +1 because we want to add a new entry into the array
		startIndex = naturalsArray[ naturals.length - 1 ].number - 1;
	}
	for ( i = startIndex + 2; i < endIndexPlus; i++ ) {
		// adding a new number at the end of the table
		naturalsArray.push( { number: i, isPrime: true } );
	}
	return naturalsArray;
}

/* goes throught the array of naturals, and removes all multiples of found primes */
function eratosthenesSieve ( indexStart, nbPrimes ) {
	var notEnoughPrimes = true;
	// looping through the set of natural integers
	for ( var i = indexStart; i < naturals.length; i++ ) {
		if ( naturals[ i ].isPrime == true ) {
			var primeNumber = naturals[ i ].number;
			var nextMultiple = primeNumber;
			// removing the multiples of this prime number and recording the last one found
			var lastMultipleFound = eratosthenesCanceller( naturals, primeNumber, nextMultiple );
			// recording the new prime number found
			primes.push( { number: primeNumber, multiple: lastMultipleFound } );
			updateProgressBar( primes.length, nbPrimes );
			// exiting the loop if enough primes have been found
			if ( primes.length == nbPrimes ) {
				notEnoughPrimes = false;
				i = naturals.length;
			}
		}
	}
	return notEnoughPrimes;
}

/* turns all multiples of a prime to false */
function eratosthenesCanceller ( naturalsArray, primeNumber, nbStart ) {
	alert( "testing for prime " + primeNumber + " starting: " + nbStart );
	var nextMultiple = nbStart + primeNumber;
	alert( "cancelling for: " + primeNumber + " start at " + nextMultiple + " - 2" );
	var nextIndex = nextMultiple - 2; // should never be less than 0
	while ( nextIndex < naturalsArray.length && nextIndex > 0 ) {
		alert( "removing " + naturalsArray[ nextIndex ].number + " at index " + nextIndex );
		naturalsArray[ nextIndex ].isPrime = false;
		nextIndex += primeNumber;
	}
	return  nextIndex + 2;
}

/* reapplies eratosthenesCanceller() to the new set of generated natural numbers */
function eratosthenesSievePastPrimeFound () {
	for ( var i = 0; i < primes.length; i++ ) {
		eratosthenesCanceller( naturals, primes[ i ].number, primes[ i ].multiple );
	}
}

/* ========================================
 *	Functions related to the display of the final result
 * ========================================
 */
function displayTable () {

	displayProgressBar( false, 100 );
	cleanPreviousTable ();

	// first row of the table
	var firstRow = document.getElementById( 'head-row' );
	// content of the table
	var tableContent = document.getElementById( 'table-body' );

	for ( var i = 0; i < primes.length; i++ ) { // vertical index

		// creating the header column cell
		var columnHead = document.createElement( 'th' );
		var headContent = document.createTextNode( primes[ i ].number );
		// inserting the header row cell
		columnHead.appendChild( headContent );
		firstRow.appendChild( columnHead );

		// new row to insert
		var row = document.createElement( 'tr' );

		// creating the header row cell
		var rowHead = document.createElement( 'th' );
		rowHead.className = "active";
		rowHead.scope = "row";
		var rowHeadContent = document.createTextNode( primes[ i ].number );
		// inserting the header row cell
		rowHead.appendChild( rowHeadContent ); // /!\ same content for both row and column
		row.appendChild( rowHead );

		// inserting the rest of the cells
		for ( var j = 0; j < primes.length; j++ ) { // horizontal index
			row.appendChild( createCell( i, j ) );
		}

		// insering the new row into the table
		tableContent.appendChild( row );
	}
}

/* creating a new cell to insert in the table */
function createCell ( verticalIndex, horizontalIndex ) {
	var cell = document.createElement( 'td' );
	// giving an id to be able to identify each cell
	cell.id = "cell-" + verticalIndex + "-" + horizontalIndex;
	// highlighting the diagonal
	if ( verticalIndex == horizontalIndex ) {
		cell.className = "info";
	}
	// content of the cell
	var product = primes[ verticalIndex ].number * primes[ horizontalIndex ].number;
	var cellContent = document.createTextNode( product );
	cell.appendChild( cellContent );

	return cell;
}

/* erases the content of the multiplication table to be able to start the display on a fresh template */
function cleanPreviousTable () {

	// restoring the header row
	var headerRow = document.getElementById( 'head-row' );
	while ( headerRow.hasChildNodes() ) {
		headerRow.removeChild( headerRow.childNodes[ 0] );
	}
	var firstCell = document.createElement( 'th' );
	headerRow.appendChild( firstCell );

	// restoring the following rows
	var tableContent = document.getElementById( 'table-body' );
	while ( tableContent.hasChildNodes() ) {
		tableContent.removeChild( tableContent.childNodes[ 0] );
	}
}

/* ========================================
 *	Global variables
 * ========================================
 */
// a variable retaining if we are in testing or production mode
var testingModeActivated = false;
// an array stocking the prime numbers found
var globalPrimes = [];
// nb of columns of the multiplication table displayed per page
var nbColumnsDisplayed = 50;

/* ========================================
 *	Functions start
 * ========================================
 */
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
		var stepLength = 0;
		var nbIteration = 1;
		var keepSieving = true;
		while ( keepSieving ) {
			// start index for the current step /!\ less than the actual number
			var indexStart = stepLength;
			// increasing the set of natural numbers by x for this step
			var stepLength = 1000 * nbIteration;
			naturals = initNaturals( naturals, stepLength );
			// removing previous multiples if necessary
			eratosthenesSievePastPrimeFound( primes, naturals );
			// selecting primes through the natural numbers
			var resultComputation = eratosthenesSieve( primes, naturals, indexStart, n.value );
			keepSieving = resultComputation.continue;
			primes = resultComputation.primes;
			// preparing for the next step if necessary
			nbIteration++;
		}

		globalPrimes = primes;

		// we start by displaying the first page
		var nbPages = displayTable( primes, 0 );
		initPagination( nbPages );
	}
}

/* ========================================
 *	Functions related to the display of the current mode
 * ========================================
 */
/* changes application mode to testing */
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

/* changes application mode to production */
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
	var startNumber = 2;
	// pushing the indexes further if table is already filled
	if ( naturalsArray.length > 0 ) {
		// getting the last number of the array
		// +1 because we want to add a new entry into the array
		startNumber = naturalsArray[ naturalsArray.length - 1 ].number + 1;
	}
	// shifting the final index according to the starting number
	var endIndexPlus = lengthValue + startNumber;
	for ( var i = startNumber; i < endIndexPlus; i++ ) {
		// adding a new number at the end of the table
		naturalsArray.push( { number: i, isPrime: true } );
	}
	return naturalsArray;
}

/* goes throught the array of naturals, and removes all multiples of found primes while storing prime numbers */
function eratosthenesSieve ( primesArray, naturalsArray, indexStart, nbPrimes ) {
	var notEnoughPrimes = true;
	// looping through the set of natural integers
	for ( var i = indexStart; i < naturalsArray.length; i++ ) {
		if ( naturalsArray[ i ].isPrime == true ) {
			var primeNumber = naturalsArray[ i ].number;
			var nextMultiple = primeNumber;
			// removing the multiples of this prime number and recording the last one found
			var updatingArrays = eratosthenesCanceller( naturalsArray, primeNumber, nextMultiple );
			var lastMultipleFound = updatingArrays.lastMultiple;
			naturalsArray = updatingArrays.naturals;
			// recording the new prime number found
			primesArray.push( { number: primeNumber, multiple: lastMultipleFound } );
			// exiting the loop if enough primes have been found
			if ( primesArray.length == nbPrimes ) {
				notEnoughPrimes = false;
				i = naturalsArray.length;
			}
		}
	}
	return { continue: notEnoughPrimes, primes: primesArray, naturals: naturalsArray };
}

/* turns all multiples of a prime to false */
function eratosthenesCanceller ( naturalsArray, primeNumber, nbStart ) {
	var nextMultiple = nbStart + primeNumber;
	var nextIndex = nextMultiple - 2; // should never be less than 0
	while ( nextIndex < naturalsArray.length && nextIndex > 0 ) {
		naturalsArray[ nextIndex ].isPrime = false;
		nextIndex += primeNumber;
	}
	return { lastMultiple: nextIndex + 2, naturals: naturalsArray };
}

/* reapplies eratosthenesCanceller() to the new set of generated natural numbers */
function eratosthenesSievePastPrimeFound ( primesArray, naturalsArray ) {
	for ( var i = 0; i < primesArray.length; i++ ) {
		eratosthenesCanceller( naturalsArray, primesArray[ i ].number, primesArray[ i ].multiple );
	}
	return naturalsArray;
}

/* ========================================
 *	Functions related to the display of the final result
 * ========================================
 */
/* reorganise the arrays of primes, so that there are subsets */
function subsetPrimes( primes ) {
	// the array of array of prime numbers
	var primesSubset = [];
	// a subset array to fill with 100 elements only
	var subsetArray = [];

	var index = 0;
	for ( var i = 0; i < primes.length; i++ ) {
		// putting the current element into a subset array
		subsetArray.push( primes[ i ].number );
		// lookin at the next element
		var iPlus = i + 1;
		if ( iPlus % nbColumnsDisplayed == 0 || iPlus == primes.length ) {
			// the subset array is complete and the loop can restart filling it
			primesSubset.push( subsetArray );
			subsetArray = [];
		}
	}

	return primesSubset;

}

/* fills and displays the multiplication table */
function displayTable ( primes, pageIndex ) {

	cleanPreviousTable();

	// set of primes to display
	var displayedPrimes = subsetPrimes( primes );
	var nbPages = displayedPrimes.length;

	if ( pageIndex < nbPages ) {
		// selecting only the part we are interested in
		displayedPrimes = displayedPrimes[ pageIndex ];

		document.getElementById( 'prime-tables' ).classList.remove( 'hidden' );

		// first row of the table
		var firstRow = document.getElementById( 'head-row' );
		// content of the table
		var tableContent = document.getElementById( 'table-body' );

		for ( var i = 0; i < primes.length; i++ ) { // vertical index (all primes)

			if ( i < displayedPrimes.length ) {
				// creating the header column cell
				var columnHead = document.createElement( 'th' );
				var headContent = document.createTextNode( displayedPrimes[ i ] );
				// inserting the header row cell
				columnHead.appendChild( headContent );
				firstRow.appendChild( columnHead );
			}

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
			for ( var j = 0; j < displayedPrimes.length; j++ ) { // horizontal index (only displayed primes)
				var factorLeft = primes[ i ].number;
				var factorTop = displayedPrimes[ j ];
				row.appendChild( createCell( i, j, factorLeft, factorTop ) );
			}

			// insering the new row into the table
			tableContent.appendChild( row );
		}
	}

	// the total number of pages
	return nbPages;
}

/* creating a new cell to insert in the table */
function createCell ( verticalIndex, horizontalIndex, factorLeft, factorTop ) {
	var cell = document.createElement( 'td' );
	// giving an id to be able to identify each cell
	cell.id = "cell-" + verticalIndex + "-" + horizontalIndex;
	// highlighting the diagonal
	if ( factorLeft == factorTop ) {
		cell.className = "info";
	}
	// content of the cell
	var product = factorLeft * factorTop;
	var cellContent = document.createTextNode( product );
	cell.appendChild( cellContent );

	return cell;
}

/* erases the content of the multiplication table to be able to start the display on a fresh template */
function cleanPreviousTable () {

	// restoring the header row
	var headerRow = document.getElementById( 'head-row' );
	while ( headerRow.hasChildNodes() ) {
		headerRow.removeChild( headerRow.childNodes[ 0 ] );
	}
	var firstCell = document.createElement( 'th' );
	headerRow.appendChild( firstCell );

	// restoring the following rows
	var tableContent = document.getElementById( 'table-body' );
	while ( tableContent.hasChildNodes() ) {
		tableContent.removeChild( tableContent.childNodes[ 0 ] );
	}
}

/* ========================================
 *	Functions related to the display of the pagination
 * ========================================
 */
/* resets and shows the pagination */
function initPagination ( nbPages ) {
	var paginationList = document.getElementById( 'page-numbers' );

	// clearing previous elements
	while ( paginationList.hasChildNodes() ) {
		paginationList.removeChild( paginationList.childNodes[ 0 ] );
	}

	// adding one link for each page
	for ( var i = 0; i < nbPages; i++ ) {

		var iPlus = i + 1; // index start at 0, but we display 1 to the user

		// creation of elements
		var liPage 		= document.createElement( 'li' );
		var aPage 			= document.createElement( 'a' );
		var aContent 			= document.createTextNode( iPlus );
		// setting up attributes
		liPage.className = "page-item";
		liPage.id = "page-btn-" + i;
		aPage.className = "page-link";
		aPage.href = "#";
		// preparing the function to call
		var parameteredFunction = "changePage(" + i + ", " + nbPages + "); return false;"
		aPage.setAttribute( 'onClick', parameteredFunction );
		// inserting into page
		aPage.appendChild( aContent );
		liPage.appendChild( aPage );
		paginationList.appendChild( liPage );
	}

	// setting the current page to 0
	changePage( 0, nbPages );

}

function changePage( newPage, totalPages ) {
	// remove the "active" tag
	for ( var i = 0; i < totalPages; i++ ) {
		var page = document.getElementById( "page-btn-" + i );
		page.classList.remove( "active" );
	}

	// add the "active" tag to current page
	var currentPage = document.getElementById( "page-btn-" + newPage );
	currentPage.classList.add( "active" );

	// change content of table
	displayTable( globalPrimes, newPage );
}

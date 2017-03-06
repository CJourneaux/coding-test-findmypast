/* ========================================
 *	Starting tests
 * ========================================
 */
function startTests () {
	// verify input and start computation
	if ( testingModeActivated ) {
		// start the tests
		globalTest();
		// making sure the test results will be shown
		document.getElementById( 'test-results' ).classList.remove( 'hidden' );
	} else {
		// hiding the space displaying test results
		document.getElementById( 'test-results' ).classList.add( 'hidden' );
	}
}

function globalTest () {


	results = [];

	results.push( test1() );
	results.push( test2() );
	results.push( test3() );
	results.push( test4() );
	results.push( test5() );
	//results.push( test6() );
	//results.push( test7() );
	//results.push( test8() );
	//results.push( test9() );
	//results.push( test10() );
	//results.push( test11() );
	//results.push( test12() );
	//results.push( test13() );

	displayResults( results );
}

function displayResults( results ) {

	var testDisplaySpace = document.getElementById( 'test-results-details' );

	// removing potential previous test results
	while( testDisplaySpace.hasChildNodes() ){
		testDisplaySpace.removeChild( testDisplaySpace.lastChild );
	}

	var nbTests = results.length;
	var nbFails = 0;

	for ( var i = 0; i < nbTests; i++ ) {
		if ( ! results[ i ].successful ) {
			// record the number of tests that failed
			nbFails++;
			/* STRUCTURE OF DISPLAYED RESULTS
			 *	> div .panel .panel-danger
			 *		> div .panel-heading
			 *			> h3 .panel-title
			 *				text
			 *		> div panel-body
			 *			text
			 */
			// create the elements to display this test results
			var divPanel = document.createElement( 'div' );
			var divPanelHeading = document.createElement( 'div' );
			var divPanelTitle = document.createElement( 'h3' );
			var divPanelBody = document.createElement( 'div' );
			// putting the correct classes to each element
			divPanel.className = 'panel panel-danger';
			divPanelHeading.className = 'panel-heading';
			divPanelTitle.className = 'panel-title';
			divPanelBody.className = 'panel-body';
			// filling the elements with content
			var divPanelTitleText = document.createTextNode( "Test #" + i );
			var divPanelBodyText = document.createTextNode( results[ i ].message );
			// linking the elements together
			divPanelBody.appendChild( divPanelBodyText );
			divPanelTitle.appendChild( divPanelTitleText );
			divPanelHeading.appendChild( divPanelTitle );
			divPanel.appendChild( divPanelHeading );
			divPanel.appendChild( divPanelBody );
			// adding the final result into the web page
			testDisplaySpace.appendChild( divPanel );
		}
	}
	document.getElementById( 'global-result' ).innerHTML = nbTests + " tests executed ~ " + nbFails + " failures";
}

/* application correctly displaying which mode it is in */
function test1 () {
	var testPassed = false;
	var buttonWork = document.getElementById( 'toggle-work' );
	var buttonTest = document.getElementById( 'toggle-test' );

	if ( window.testingModeActivated ) {
		// buttonTest <=> .btn-warning
		// buttonWork <=> .btn-default
		if ( buttonTest.classList.contains( 'btn-warning' ) ) {
			if ( ! buttonTest.classList.contains( 'btn-default' ) ) {
				if ( ! buttonWork.classList.contains( 'btn-info' ) ) {
					if ( buttonWork.classList.contains( 'btn-default' ) ) {
						testPassed = true;
					}
				}
			}
		}
	} else {
		// buttonWork <=> .btn-info
		// buttonTest <=> .btn-default
		if ( buttonWork.classList.contains( 'btn-info' ) ) {
			if ( ! buttonWork.classList.contains( 'btn-default' ) ) {
				if ( ! buttonTest.classList.contains( 'btn-warning' ) ) {
					if ( buttonTest.classList.contains( 'btn-default' ) ) {
						testPassed = true;
					}
				}
			}
		}
	}
	var conclusion = "Toggle buttons are not correctly set."
	if ( testPassed ) {
		conclusion = "Toggle buttons are correctly set."
	}
	return { number: 1, successful: testPassed, message: conclusion }
}

/* n exists */
function test2 () {
	if ( typeof getN().value !== 'undefined' ) {
		return { number: 2, successful: true, message: "n exists" };
	} else {
		return { number: 2, successful: false, message: "n could not be found" };
	}
}

/* n is not null */
function test3 () {
	if ( getN().value ) {
		return { number: 3, successful: true, message: "n is not null" };
	} else {
		return { number: 3, successful: false, message: "n is empty" };
	}
}

/* n is a number */
function test4 () {
	if ( isNaN( getN().value ) ) {
		return { number: 4, successful: false, message: "n is not a number" };
	} else {
		return { number: 4, successful: true, message: "n is a number"};
	}
}

/* n is an integer */
function test5 () {
	if ( getN().value % 1 === 0 ) {
		return { number: 5, successful: true, message: "n is an integer"};
	} else {
		return { number: 5, successful: false, message: "n is not an integer" };
	}
}

/* n is greater than 0 */
function test6 () {
	if ( getN().value > 0 ) {
		return { number: 6, result: true, message: "n is strictly positive"};
	} else {
		return { number: 6, result: false, message: "n is not strictly positive" };
	}
}

function test7 () {

}

function test8 () {

}

function test9 () {

}

function test10 () {

}

function test11 () {

}

function test12 () {

}

function test13 () {

}

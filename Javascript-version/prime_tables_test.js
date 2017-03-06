/* ========================================
 *	Starting tests or computations
 * ========================================
 */
function start () {
	if ( testingModeActivated ) {
		// start the tests
		alert( "Tests start" );
		globalTest();
	} else {
		// verify input and start computation
		alert( "Computation start" );
	}
}

function globalTest () {

	
	results = [];

	results.push( test1() );
	/*results.push( test2() );
	results.push( test3() );
	results.push( test4() );
	results.push( test5() );
	results.push( test6() );
	results.push( test7() );
	results.push( test8() );
	results.push( test9() );
	results.push( test10() );
	results.push( test11() );
	results.push( test12() );
	results.push( test13() );*/

	displayResults( results );
}

function displayResults( results ) {alert( "Tests - Next step" );
	var nbTests = results.length;
	var nbFails = 0;

	var testDisplaySpace = document.getElementById( 'test-results' );

	for ( var i = 0; i < nbTests; i++ ) {
		if ( ! results[ i ].successful ) {
			// record the test that failed
			nbFails++;
			/* STRUCTURE OF DISPLAYED RESULTS
			 *	> div .panel .panel-danger
			 *		> div .panel-heading
			 *			> h3 .panel-title
			 *				text
			 *		> div panel-body
			 *			text
			 */

			// create the elements to display the test results
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

/*
 * application correctly displaying which mode it is in
 */
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

/*
 * n is not null
 */
function test2 () {
	if ( true ) {
		return { number: 2, successful: true, message: "n is not null" };
	} else {
		return { number: 2, successful: false, message: "n is empty" };
	}
	
	
}

/*
 * n is an integer
 */
function test3 () {
	//return { number: 3, result: "SUCCESS", message: "n is an integer"};
	return { number: 3, result: "FAIL", message: "n is not an integer" };
}

/*
 * n is greater than 0
 */
function test4 () {
	//return { number: 4, result: "SUCCESS", message: "n is greater than 0"}
	return { number: 4, result: "FAIL", message: "n is not greater than 0" };
}


function test5 () {
	
}

function test6 () {
	
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
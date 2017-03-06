var testingModeActivated = false;

/* ========================================
 *	Functions related to the display
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
		 * => Makes sure we select only the clasname interesting us, and not a similar classname, part of a longer one
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
 *	Functions related to the computation
 * ========================================
 */

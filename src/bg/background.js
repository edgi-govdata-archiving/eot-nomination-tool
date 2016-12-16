function getPageDetails(callback) {
    // Inject the content script into the current page
    chrome.tabs.executeScript(null, { file: 'event.js' });
    // Perform the callback when a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message)  {
        // Call the callback function
        callback(message);
    });
};


// // Google Forms constants
// var GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/formResponse?ifq';
// var NAME_FIELD = '&entry.604638068=';
// var EMAIL_FIELD = '&entry.582835473=';
// var EVENTNAME_FIELD = '&entry.1800984457=';
// var URL_FIELD = '&entry.242612017=';
// var COMMENT_FIELD = '&entry.1562922032=';
// var NOTIFICATION_TOOL_URL = 'http://digital2.library.unt.edu/nomination/eth2016/url/';

// // On click action for Extension
// chrome.browserAction.onClicked.addListener( function( tab ) {
//   console.log( "tab = ", tab );
//   var currentURL = tab.url.replace( 'https://', '' );

//   // Instantiate locaStorage Variables
//   var default_name = localStorage.name || 'Enter your name ';
//   var default_EventName = localStorage.eventName || 'Enter event name';
//   var default_email = localStorage.email || 'Enter your email or type a space to make this message disappear! ';

//   console.log( "pressed" );

//   // Check if localStorage has name if not prompt
//   if ( !localStorage.name ) {
//     var nameAnswer = prompt( 'Please enter your name', default_name );
//     localStorage.name = nameAnswer;
//   }

//   // Check if localStorage has event anem if not prompt
//   if ( !localStorage.eventName ) {
//     var eventAnswer = prompt( 'Please enter your event name', default_EventName );
//     localStorage.eventName = eventAnswer;
//   }

//   // Check if localStorage has email if not prompt
//   if ( !localStorage.email ) {
//     var emailAnswer = prompt( 'Please enter your email', default_email );
//     localStorage.email = emailAnswer;
//   }

//   // Allow a comment on the url.
//   var commentAnswer = prompt( 'Please enter any further helpful information', "" );

//   // Do GET call to post to Google Form and open new tab
//   $.get( {
//     url: GOOGLE_FORMS_URL + NAME_FIELD + localStorage.name + EMAIL_FIELD + localStorage.email + EVENTNAME_FIELD + localStorage.eventName + COMMENT_FIELD + commentAnswer + URL_FIELD + currentURL + '&submit=Submit',
//     success: function( res ) {
//       alert( "Thank you for submitting \n" + currentURL + ". \n\nThe nomination will be added to the seed queue." );
//       // uncomment this line to also add the URL through the official notificaiton tool.
//       // window.open(NOTIFICATION_TOOL_URL + currentURL);
//     },
//     error: function( err ) {
//       console.error( err );
//     }
//   } );
// } );

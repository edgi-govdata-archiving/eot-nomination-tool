/* List of Agency Office Codes and their corresponding Department names
*/
window.AGENCY_IDS = {
  "1": "Environmental Protection Agency",
  "2": "Energy Department",
  "3": "National Oceanic and Atmospheric Administration",
  "4": "Occupational Safety and Health Administration",
  "5": "National Aeronautics and Space Administration: Science Mission Directorate",
  "6": "National Aeronautics and Space Administration: Sciences and Exploration Directorate",
  "7": "Agriculture Department",
  "8": "Interior Department"
};

function onPageDetailsReceived( pageDetails ) {
  pageTitle = document.getElementById( 'title' ).value = pageDetails.title;
  currentURL = document.getElementById( 'url' ).value = pageDetails.url;
}

// POST the data to the server using XMLHttpRequest
function nominationTool( e ) {
  e.preventDefault();

  // Google Forms constants
  var GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSflojxTxupymTY1ZIJfj4NM7BgXWc-RDg5dg0Yyf1wzx8AvqA/formResponse?ifq';
  var NAME_FIELD = '&entry.604638068=';
  var EMAIL_FIELD = '&entry.582835473=';
  var EVENTNAME_FIELD = '&entry.1800984457=';
  var URL_FIELD = '&entry.242612017=';
  var TITLE_FIELD = '&entry.1562922032=';

  var NOTIFICATION_TOOL_URL = 'http://digital2.library.unt.edu/nomination/eth2016/url/';
  var AGENCY_FIELD = '&entry.1285343614=';
  var AGENCY_ID = '&entry.536064408=';
  var SUBAGENCY_ID = '&entry.1706245913=';
  var ORGANIZATION_ID = '&entry.1076101938=';
  var SUBORG_ID = '&entry.1768657731=';
  var SUBPRIMER_ID = '&entry.615621344=';
  var CRAWLABLE_ID = "&entry.2059306163=";

  var title = $( '#title' ).val();
  var name = $( '#name' ).val();
  var email = $( '#email' ).val();
  // make constant for today's event
  // var eventName = "Guerilla Archiving Toronto Dec. 17"
  var eventName = $( '#eventName' ).val();
  var currentURL = $( '#url' ).val();
  var agency = $( '#agency option:selected' ).text();
  var agencyID = $( '#agencyID' ).val();
  var subAgencyID = $( '#subAgencyID' ).val();
  var organizationID = $( '#organizationID' ).val();
  var suborgID = $( '#suborgID' ).val();
  var subprimerID = $( '#subprimerID' ).val();
  var crawlableID = $( '#crawlableID').val();
  
  if ( localStorage.name !== name ) {
    localStorage.name = name;
  }
  if ( localStorage.email !== email ) {
    localStorage.email = email;
  }
  if ( localStorage.eventName !== eventName ) {
    localStorage.eventName = eventName;
  }
  if ( localStorage.agency !== agency ) {
    localStorage.agency = agency;
  }
  
  if ( localStorage.agencyID !== agencyID ) {
    localStorage.agencyID = agencyID;
  }
  if ( localStorage.subAgencyID !== subAgencyID ) {
    localStorage.subAgencyID = subAgencyID;
  }
  if ( localStorage.organizationID !== organizationID ) {
    localStorage.organizationID = organizationID;
  }
  if ( localStorage.suborgID !== suborgID ) {
    localStorage.suborgID = suborgID;
  }


  // Do GET call to post to Google Form and open new tab
  $.get( {
    url: GOOGLE_FORMS_URL + NAME_FIELD + localStorage.name + EMAIL_FIELD + localStorage.email + TITLE_FIELD + title + EVENTNAME_FIELD +
      localStorage.eventName + URL_FIELD + currentURL + AGENCY_FIELD + agency + AGENCY_ID + agencyID + SUBAGENCY_ID + subAgencyID + ORGANIZATION_ID + organizationID + SUBORG_ID + suborgID + SUBPRIMER_ID + subprimerID + '&submit=Submit',
    success: function( res ) {
      $( '#success' ).html( "Success!" );
      setTimeout( function() {
          window.location.reload();
        }, 1000 );
        // uncomment this line to also add the URL through the official notificaiton tool.
        // window.open(NOTIFICATION_TOOL_URL + currentURL);
    },
    error: function( err ) {
      $( '#error' ).html( err.statusText || "Error!" );
    }
  } );
}

/* When the popup loads: Autopopulate the name, event name and email if it has been submitted before,
* i.e. if localStorage has these fields already saved.
*/
window.addEventListener( 'load', function( evt ) {
  if ( localStorage.name && localStorage.name !== "null" ) {
    $( '#name' ).val( localStorage.name );
  }
  if ( localStorage.email && localStorage.email !== "null" ) {
    $( '#email' ).val( localStorage.email );
  }
  if ( localStorage.eventName && localStorage.eventName !== "null" ) {
    $( '#eventName' ).val( localStorage.eventName );
  }
  if ( localStorage.agency && localStorage.agency !== "null" ) {
    $( '#agency' ).val( localStorage.agency );
  }

  if ( localStorage.agencyID && localStorage.agencyID !== "null" ) {
    $( '#agencyID' ).val( localStorage.agencyID );
  }
  if ( localStorage.subAgencyID && localStorage.subAgencyID !== "null" ) {
    $( '#subAgencyID' ).val( localStorage.subAgencyID );
  }
  if ( localStorage.organizationID && localStorage.organizationID !== "null" ) {
    $( '#organizationID' ).val( localStorage.organizationID );
  }
  if ( localStorage.suborgID && localStorage.suborgID !== "null" ) {
    $( '#suborgID' ).val( localStorage.suborgID );
  }

  /* Disable the Department/Agency dropdown bar once the agency code has been entered.
  * Changing the code will re-enter the correct department/agency name.
  */
  $( '#agencyID' ).change( function( event ) {
    var enteredCode = $( event.currentTarget ).val();
    var agencyName = window.AGENCY_IDS[ enteredCode ];
    $( "#agency" ).val( agencyName );
    $( "#agency" ).attr( 'disabled', 'disabled' );
  } );

  // Cache a reference to the status display SPAN
  statusDisplay = document.getElementById( 'status-display' );
  // Handle the bookmark form submit event with our nominationTool function
  document.getElementById( 'nominationTool' ).addEventListener( 'submit', nominationTool );
  // Get the event page
  chrome.runtime.getBackgroundPage( function( eventPage ) {
    // Call the getPageInfo function in the event page, passing in
    // our onPageDetailsReceived function as the callback. This injects
    // content.js into the current tab's HTML
    eventPage.getPageDetails( onPageDetailsReceived );
  } );
} );

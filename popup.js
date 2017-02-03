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

function debounce(fn, duration) {
  let timeout = null;

  return function () {
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(this, args);
    }, duration);
  };
}

function showStatus(type, text) {
  $('#status')
    .attr('class', 'alert alert-' + type)
    .text(text)
    .show();
}

function hideStatus() {
  $('#status').hide();
}

function onPageDetailsReceived( pageDetails ) {
  pageTitle = document.getElementById( 'title' ).value = pageDetails.title;
  currentURL = document.getElementById( 'url' ).value = pageDetails.url;
}

// POST the data to the server using XMLHttpRequest
function handleSubmit( e ) {
  e.preventDefault();

  showStatus('info', 'Submitting');

  $('#save').prop('disabled', true);

  // Google Forms constants
  const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1udxf9C7XeO7rm-SoucjDIv0c8XzGb7VVutsCI8r4s-Y/formResponse';
  const NAME_FIELD = 'entry.1227505863';
  const EMAIL_FIELD = 'entry.1975141568';
  const EVENTNAME_FIELD = 'entry.1518336548';
  const URL_FIELD = 'entry.1767515686';
  const TITLE_FIELD = 'entry.180917746';

  const NOTIFICATION_TOOL_URL = 'http://digital2.library.unt.edu/nomination/eth2016/url/';
  const AGENCY_FIELD = 'entry.1285343614';
  const AGENCY_ID = 'entry.536064408';
  const SUBAGENCY_ID = 'entry.1706245913';
  const ORGANIZATION_ID = 'entry.1076101938';
  const SUBORG_ID = 'entry.1768657731';
  const SUBPRIMER_ID = 'entry.615621344';
  const FTP_ID = 'entry.365628902';
  const VISUALIZATION_ID = 'entry.2057247667';
  const DIFFICULTY_ID = 'entry.1702958174';
  const DATABASE_ID = 'entry.15716096';
  const COMMMENT_ID = 'entry.2034225983';
  //const CRAWLABLE_ID = 'entry.2059306163';

  var title = $( '#title' ).val();
  var name = $( '#name' ).val();
  var email = $( '#email' ).val();
  // make constant for today's event
  // var eventName = "Guerilla Archiving Toronto Dec. 17"
  var eventName = $( '#eventName' ).val();
  var currentURL = $( '#url' ).val();
  var agency = $( '#agency' ).val();
  var agencyID = $( '#agencyID' ).val();
  var subAgencyID = $( '#subAgencyID' ).val();
  var organizationID = $( '#organizationID' ).val();
  var suborgID = $( '#suborgID' ).val();
  var subprimerID = $( '#subprimerID' ).val();
  var ftpID = $( '#ftpID:checked' ).val();
  var visualizationID = $( '#visualizationID:checked').val();
  var difficultyID = $( '#difficultyID:checked').val();
  var databaseID = $( '#databaseID:checked').val();
  var commentID = $ ( '#commentID').val();

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

  if ( localStorage.subprimerID !== subprimerID ) {
    localStorage.subprimerID = subprimerID;
  }

  const data = { ifq: '' };

  data[NAME_FIELD] = localStorage.name;
  data[EMAIL_FIELD] = localStorage.email;
  data[TITLE_FIELD] = title;
  data[EVENTNAME_FIELD] = localStorage.eventName;
  data[URL_FIELD] = currentURL;
  data[AGENCY_FIELD] = agency;
  data[AGENCY_ID] = agencyID;
  data[SUBAGENCY_ID] = subAgencyID;
  data[ORGANIZATION_ID] = organizationID;
  data[SUBORG_ID] = suborgID;
  data[SUBPRIMER_ID] = subprimerID;
  //data[CRAWLABLE_ID] = crawlableID;
  data[FTP_ID] = ftpID;
  data[VISUALIZATION_ID] = visualizationID;
  data[DIFFICULTY_ID] = difficultyID;
  data[DATABASE_ID] = databaseID;
  data[COMMMENT_ID] = commentID;

  $.get(GOOGLE_FORMS_URL, data)
    .then(() => {
      $('#save').prop('disabled', false);

      showStatus('success', 'URL submitted. Thanks!');
      // @todo Why are we reloading the popup here? To reset some fields?
      setTimeout( function() {
        window.location.reload();
      }, 1000 );
      // uncomment this line to also add the URL through the official notificaiton tool.
      // window.open(NOTIFICATION_TOOL_URL + currentURL);
    })
    .catch((error) => {
      $('#save').prop('disabled', false);
      showStatus('danger', `Could not submit URL (${ error.statusText || 'Generic error' })`);
    });
}

/* When the popup loads: Autopopulate the name, event name and email if it has been submitted before,
* i.e. if localStorage has these fields already saved.
*/
$(() => {
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
  if ( localStorage.subprimerID && localStorage.subprimerID !== "null" ) {
    $( '#subprimerID' ).val( localStorage.subprimerID );
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

  $('#url').on('keyup paste change', debounce(function (event) {
    const url = $(this).val();
    const options = {
      url,
      limit: -1,
      output: 'json',
      fl: 'timestamp'
    };

    $.getJSON('http://web.archive.org/cdx/search/cdx', options)
      .then((response) => {
        if (response.length) {
          const headers = response[0];
          const rows = response.slice(1);

          return rows.map((row) => {
            const match = {};

            headers.forEach((header, idx) => {
              const value = row[idx];

              switch (header) {
              case 'timestamp':
                const tokens = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/.exec(value);

                if (tokens) {
                  match[header] = new Date(
                    parseInt(tokens[1], 10), // year
                    parseInt(tokens[2], 10) - 1, // month
                    parseInt(tokens[3], 10), // day
                    parseInt(tokens[4], 10), // hours
                    parseInt(tokens[5], 10), // minutes
                    parseInt(tokens[6], 10) // seconds
                  );
                } else {
                  console.error('Invalid timestamp value', value);
                }
                break;
              default:
                match[header] = value;
              }
            });

            return match;
          });
        } else {
          return response;
        }
      })
      .then((matches) => {
        if (matches.length) {
          const match = matches[0];
          const now = new Date();
          const staleDays = 30;
          const staleDuration = staleDays * 24 * 60 * 60 * 1000; // 30 days (in milliseconds)

          if (now - match.timestamp < staleDuration) {
            showStatus('warning', `This URL has already been archived in the last ${staleDays} days`);
          }
        }
      })
      .catch((error) => {
        console.error('Error looking up URL in CDX', error);
      });
  }, 500));

  // Focus first field for a11y
  $('#title').focus();

  $('#nomination-form').submit(handleSubmit);

  // Get the event page
  chrome.runtime.getBackgroundPage( function( eventPage ) {
    // Call the getPageInfo function in the event page, passing in
    // our onPageDetailsReceived function as the callback. This injects
    // content.js into the current tab's HTML
    eventPage.getPageDetails( onPageDetailsReceived );
  } );
});

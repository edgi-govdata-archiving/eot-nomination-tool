//Google Form constants
var GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/formResponse?ifq';
var NAME_FIELD = '&entry.604638068=';
var EVENTNAME_FIELD = '&entry.1800984457=';
var URL_FIELD = '&entry.242612017=';

//On click action for Extension
chrome.browserAction.onClicked.addListener( function( tab ) {
  console.log( "tab = ", tab );
  var currentURL = tab.url.replace( 'https://', '' );

  //instantiate locaStorage Variables
  default_name = localStorage["name"] || 'Enter your name ';
  default_EventName = localStorage["eventName"] || 'Enter event name';

  var notificationToolUrl = 'http://digital2.library.unt.edu/nomination/eth2016/url/';

  console.log("pressed");

  //check if localStorage has name if not prompt
  if(!localStorage["name"]){
    var nameAnswer = prompt('Please enter your name',default_name);
    localStorage["name"] = nameAnswer;
  };

  //check if localStorage has event anem if not prompt
  if(!localStorage["eventName"]){
    var eventAnswer = prompt('Please enter your event name', default_EventName);
    localStorage["eventName"] = eventAnswer;
  };
  // Do GET call to post to Google Form and open new tab
  $.get({
    url: GOOGLE_FORMS_URL + NAME_FIELD + localStorage["name"] + EVENTNAME_FIELD + localStorage["eventName"]
    + URL_FIELD + currentURL+'&submit=Submit',
    success: function(res){
      window.open(notificationToolUrl + currentURL);
    },
    error: function(err){
      console.error(err);
    }
  });
} );

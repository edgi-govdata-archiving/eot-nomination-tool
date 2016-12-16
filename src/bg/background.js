//Google Form constants
var GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/formResponse?ifq';
var NAME_FIELD = '&entry.604638068=';
var EVENTNAME_FIELD = '&entry.1800984457=';
var URL_FIELD = '&entry.242612017=';
var COMMENT_FIELD = '&entry.1562922032=';

//On click action for Extension
chrome.browserAction.onClicked.addListener( function( tab ) {
  console.log( "tab = ", tab );
  var currentURL = tab.url.replace( 'https://', '' );

  //instantiate locaStorage Variables
    default_name = localStorage["name"] || 'Enter your name ';
    default_EventName = localStorage["eventName"] || 'Enter event name';
    default_email = localStorage["email"] || 'Enter your email or type a space to make this message disappear! ';

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

    //check if localStorage has email if not prompt
    if(!localStorage["email"]){
        var emailAnswer = prompt('Please enter your email',default_email);
        localStorage["email"] = emailAnswer;
    };

    // allow a comment on the url:
    var commentAnswer = prompt('Please enter any further helpful information', "");

  // Do GET call to post to Google Form and open new tab
  $.get({
    url:GOOGLE_FORMS_URL + NAME_FIELD + localStorage["name"] + EVENTNAME_FIELD + localStorage["eventName"]
          + URL_FIELD + currentURL + COMMENT_FIELD + commentAnswer +'&submit=Submit',
      success: function(res){
          console.log("successfully logged " + url + "to the event spreadsheet.");
          alert("thank you!");
     // window.open(notificationToolUrl + currentURL);
    },
    error: function(err){
      console.error(err);
    }
  });
} );

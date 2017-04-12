/* List of Agency Office Codes and their corresponding Department names
*/
var agencyIds = {
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
  var timeout = null;

  return function () {
    var scope = this;
    var args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      timeout = null;
      fn.apply(scope, args);
    }, duration);
  };
}

var statusHideTimeout = null;

function showStatus(type, text) {
  if (statusHideTimeout) {
    clearTimeout(statusHideTimeout);
    statusHideTimeout = null;
  }

  $('#status')
    .attr('class', 'status -' + type)
    .text(text)
    .show();
}

function hideStatus(delay) {
  if (statusHideTimeout) {
    clearTimeout(statusHideTimeout);
    statusHideTimeout = null;
  }

  if (delay) {
    statusHideTimeout = setTimeout(hideStatus, delay);
  } else {
    $('#status').hide();
  }
}

function showUrlWarning(text) {
  $('#url-warning').text(text).show();
}

function hideUrlWarning() {
  $('#url-warning').hide();
}

function checkUrl() {
  var options = {
    url: $('#url').val(),
    limit: -1,
    output: 'json',
    fl: 'timestamp'
  };

  $.getJSON('http://web.archive.org/cdx/search/cdx', options)
    .then(function (response) {
      if (response.length) {
        var headers = response[0];
        var rows = response.slice(1);

        return rows.map(function (row) {
          var match = {};

          headers.forEach(function (header, idx) {
            var value = row[idx];

            switch (header) {
            case 'timestamp':
              var tokens = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/.exec(value);

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
    .then(function (matches) {
      hideUrlWarning();

      if (matches.length) {
        var match = matches[0];
        var now = new Date();
        var staleDays = 30;
        var staleDuration = staleDays * 24 * 60 * 60 * 1000; // days in milliseconds

        if (now - match.timestamp < staleDuration) {
          showUrlWarning('This URL has already been crawled by Internet Archive in the last  ' + staleDays + ' days');
        }
      }
    })
    .catch(function (error) {
      hideUrlWarning();
      console.error('Error looking up URL in CDX', error);
    });
}

function checkAgency() {
  /* Disable the Department/Agency dropdown bar once the agency code has been entered.
  * Changing the code will re-enter the correct department/agency name.
  */
  var agencyId = $('#agencyId').val();
  var agencyName = agencyIds[agencyId];

  if (agencyName) {
    $("#agencyName").val(agencyName).prop('disabled', true);
  } else {
    $("#agencyName").prop('disabled', false);
  }
}

function onPageDetailsReceived(pageDetails) {
  $('#title').val(pageDetails.title);
  $('#url').val(pageDetails.url);
  checkUrl();
}

function getCookieValue(url, name) {
  return new Promise(function (resolve, reject) {
    chrome.cookies.get({
      url: url,
      name: name
    }, function (cookie) {
      if (cookie) {
        resolve(cookie.value);
      } else {
        reject(new Error('Could not read cookie: ' + name));
      }
    });
  });
}

function submitToArchivers(fields) {
  console.log('Submitting to Custom Endpoint');

  var url = 'https://api.archivers.space/v0/uncrawlables';
  
  return $.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(fields)
  });
}

function submitToGoogleForms(fields) {
  console.log('Submitting to Google Forms');

  var url = 'https://docs.google.com/forms/d/1udxf9C7XeO7rm-SoucjDIv0c8XzGb7VVutsCI8r4s-Y/formResponse';

  var fieldConversion = {
    title: 180917746,
    url: 1767515686,
    nominatorName: 1227505863,
    nominatorEmail: 1975141568,
    eventName: 1518336548,
    agencyName: 1285343614,
    agencyId: 536064408,
    subAgencyId: 1706245913,
    organizationId: 1076101938,
    suborgId: 1768657731,
    subprimerId: 615621344,
    hasFtp: 365628902,
    hasVisualization: 2057247667,
    hasManyFiles: 1702958174,
    hasDatabase: 15716096,
    comments: 2034225983
  };

  var query = { ifq: '' };

  for (var fieldName in fieldConversion) {
    var fieldValue = fields[fieldName];
    var queryParamName = 'entry.' + fieldConversion[fieldName];

    query[queryParamName] = typeof fieldValue === 'boolean'
      ? fieldValue ? 'Yes' : ''
      : fieldValue;
  }

  return $.get(url, query)
    .then(function () {
      console.log('Submitted to Google Forms');
    });
}

function submitToUntGwda(fields) {
  console.log('Submitting to UNT GWDA');

  var url = 'http://digital2.library.unt.edu/nomination/GWDA/add/';

  var fieldConversion = {
    url: 'url_value',
    nominatorName: 'nominator_name',
    nominatorEmail: 'nominator_email',
    eventName: 'nominator_institution'
  };

  return $.get(url) // Load form page to get CSRF cookie
    .then(function () {
      console.log('Loaded form page');

      return getCookieValue(url, 'csrftoken');
    })
    .then(function (csrfToken) {
      console.log('Got CSRF token');

      var body = { csrfmiddlewaretoken: csrfToken };

      for (var fieldName in fieldConversion) {
        var fieldValue = fields[fieldName];
        var bodyParamName = fieldConversion[fieldName];

        body[bodyParamName] = fieldValue;
      }

      return $.post(url, body)
        .then(function () {
          console.log('Submitted to UNT GWDA');
        });
    });
}

// POST the data to the server using XMLHttpRequest
function handleSubmit(e) {
  e.preventDefault();

  var fields = {
    url: $('#url').val(),
    title: $('#title').val(),
    nominatorName: $('#nominatorName').val(),
    nominatorEmail: $('#nominatorEmail').val(),
    eventName: $('#eventName').val(),
    agencyName: $('#agencyName').val(),
    agencyId: $('#agencyId').val(),
    subAgencyId: $('#subAgencyId').val(),
    organizationId: $('#organizationId').val(),
    suborgId: $('#suborgId').val(),
    subprimerId: $('#subprimerId').val(),
    hasFtp: !!$('#hasFtp:checked').val(),
    hasVisualization: !!$('#hasVisualization:checked').val(),
    hasManyFiles: !!$('#hasManyFiles:checked').val(),
    hasDatabase: !!$('#hasDatabase:checked').val(),
    comments: $('#comments').val()
  };

  localStorage.nominatorName = fields.nominatorName;
  localStorage.nominatorEmail = fields.nominatorEmail;
  localStorage.eventName = fields.eventName;
  localStorage.agencyName = fields.agencyName;
  localStorage.agencyId = fields.agencyId;
  localStorage.subAgencyId = fields.subAgencyId;
  localStorage.organizationId = fields.organizationId;
  localStorage.suborgId = fields.suborgId;
  localStorage.subprimerId = fields.subprimerId;

  showStatus('pending', 'Submitting');

  $('#submit').prop('disabled', true);

  $.when(submitToGoogleForms(fields), submitToArchivers(fields), submitToUntGwda(fields))
    .then(function () {
      $('#submit').prop('disabled', false);

      showStatus('success', 'URL submitted. Thanks!');
      hideStatus(3000);
    })
    .catch(function (error) {
      $('#submit').prop('disabled', false);
      showStatus('failure', 'Could not submit URL');
    });
}

/* When the popup loads: Autopopulate the name, event name and email if it has been submitted before,
* i.e. if localStorage has these fields already saved.
*/
$(function () {
  $('#nominatorName').val(localStorage.nominatorName);
  $('#nominatorEmail').val(localStorage.nominatorEmail);
  $('#eventName').val(localStorage.eventName);
  $('#agencyName').val(localStorage.agencyName);
  $('#agencyId').val(localStorage.agencyId);
  $('#subAgencyId').val(localStorage.subAgencyId);
  $('#organizationId').val(localStorage.organizationId);
  $('#suborgId').val(localStorage.suborgId);
  $('#subprimerId').val(localStorage.subprimerId);

  checkAgency();

  $('#agencyId').change(checkAgency);

  $('#url').on('keyup paste change', debounce(checkUrl, 500));

  // Focus first field for a11y
  $('#title').focus();

  hideUrlWarning();
  hideStatus();

  $('#form').submit(handleSubmit);

  // Get the event page
  chrome.runtime.getBackgroundPage(function (eventPage) {
    // Call the getPageInfo function in the event page, passing in
    // our onPageDetailsReceived function as the callback. This injects
    // content.js into the current tab's HTML
    eventPage.getPageDetails(onPageDetailsReceived);
  });
});

# Contributing Guidelines

We love improvements to our tools! EDGI has general [guidelines for contributing](https://github.com/edgi-govdata-archiving/overview/blob/master/CONTRIBUTING.md) to all of our organizational repos. 

In contrast to earlier instructions, _we no longer encourage collaborators to publish their own forks to the Google Chrome Store_. Instead, please just be sure to co-ordinate with EDGI before the event, so we know you will be pushing seeds to our spreadsheet, and to request read access to the results if you don't already have it.  On the other hand, we would still love to have your help improving this extension!

## Installing from source

1.	Download or Clone this repo: https://github.com/CivicTechTO/presidential-harvest-nomination-tool
    <img src="https://raw.githubusercontent.com/mi-lee/presidential-harvest-nomination-tool/master/docs/img/gitclone.png" width="700" align="middle"/>

1. In Google Chrome Menu -> `Settings` -> `Extensions`, enable Developer Mode

1. Click `Load unpacked extension`
    <img src="https://raw.githubusercontent.com/mi-lee/presidential-harvest-nomination-tool/master/docs/img/loadExtension.png" width="700" align="middle"/>

1. Choose the folder containing the extension files, and click `Select`
    <img src="https://raw.githubusercontent.com/mi-lee/presidential-harvest-nomination-tool/master/docs/img/selectDirectory.png" width="700" align="middle"/>

1. Extension should appear now
    <img src="https://raw.githubusercontent.com/mi-lee/presidential-harvest-nomination-tool/master/docs/img/postinstallExtension.png" width="700" align="middle"/>


## How it works

The extension sends the form information to a Google Form, which saves responses to a Google spreadsheet. The extension's form is in `popup.html`, while the variables mapping our form elements to the Google Form are in `popup.js`. `content.js` and `event.js` work together to retrieve the title and URL of the page loaded in the current browser tab. `src/lib/` contains a copy of jquery, which we use for some basic plumbing.

## Forking, if you have to

If for some reason you desperately want to fork the tool, you can do so this way:

1. Create your own Google Form.  You can copy [ours](https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/edit), or create your own from scratch
    * Once you've created a form, Google will automagically create a spreadsheet to store the responses. You can also use the fancy response visualization tool to get some basic information about submissions.
    * Make note of the form URL. In `popup.js`, update the `GOOGLE_FORMS_URL` variable with the new URL, taking care to **replace the final `edit` with `/formResponse`**.

    The line you're looking for looks like this:
    ```js
    const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/formResponse';
    ```

1. For each field name, you will have to identify the corresponding field entry id and update the various field-related variables. In your browser's developer tools pane, `inspect element` on the input field. You should see `entry.[integer]` in the highlighted code. That is the value for the entry field ID.

1. The first time a user nominates a seed, they will choose a government agency, subagency, organization, and possibly suborganization. Subsequent nominations will default to these same values. 

1. If you're modifying this extension for  non-environment-related event, you will probably want to imitate or extend the EDGI agency taxonomy. Contact us for more information, and/or read our [agency primers](https://envirodatagov.org/agency-forecasts/), which you will want to modify. 

Contact us for further information!

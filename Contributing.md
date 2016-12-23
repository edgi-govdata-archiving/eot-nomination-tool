# Contributing and Forking This Tool

You can use this tool as currently designed for your own event. At present, it pushes all seed nominations to a Google spreasheet owned by the EDGI group in Toronto. If you would like to push to your own spreasheet, the process is pretty simple, but requires small modifications to the sourcecode. 

1. Create your own Google Form.  You can copy [ours](https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/edit), or create your own from scratch
    * Once you've created a form, Google will automagically create a spreadsheet in which to store the responses. You can also use the fancy response visualizations tool to get some basic information about submissions.
  * Make note of the form URL. In `popup.js`, update the `GOOGLE_FORMS_URL` variable with the new URL, taking care to **replace the final `edit` with `/formResponse?ifq`**. 
  
  The line you're looking for looks like this:
  ```js
  var GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/1kuwxu2lXYSRpkwBj4o9kwjURZL3hgk-mSFoK4qkC4ZI/formResponse?ifq';
```

2. For each field name, you will have to identify the corresponding field entry id and update the various field-relate variables. In your browser's developer tools pane, `inspect element` on the input field. You should see `entry.[integer]` in the highlighted code. That is the value for the entry field ID. 

3. The first time a user nominates a seed, they will choose a government agency. Subsequent nominations will default to that same agencies, but the default list here is extensive. If you are modifying the extension anyway, you may want to filter out this list in the `#agency` field of `popup.html`.

Small events can uncomment the "notificationToolUrl"-related lines -- this will permit users to add seeds directly to the nomination tool database. However, there is some worry that large numbers of users could crash the nomination tool server; so for large events, we've commented this out.

Contact us for further information!


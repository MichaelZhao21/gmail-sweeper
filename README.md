# Gmail Sweeper

Google App Script that will automatically clean your inbox!

## Setup

Create a script called `constants.js` with the following content:

```js
const SPREADSHEET_ID = ""; // ID of spreadsheet, should be https://docs.google.com/spreadsheets/d/<ID_HERE>/edit
const SHEET_NAME = "" // Name of the sheet within spreadsheet
```

The values above are filled in based on a spreadsheet you will need to make. The spreadsheet is very simple and follows the format shown below:

| One Day | Three Days | Seven Days |
|---------|------------|------------|
| query 1 | query 2    | query 3    |
| etc     |            |            |

Note that the headers don't matter but it's important that query entries start on row 2 and the three columns are columns A-C. Query entries also do not have to be consecutive (there can be gaps in the column). The format of the queries is the [Gmail query format](https://support.google.com/mail/answer/7190?hl=en&co=GENIE.Platform%3DAndroid), which can be easily created with the ["Show Search Options"](https://support.google.com/mail/answer/6579?hl=en) on the search bar (used to create filters).

## Execution

You need to have [clasp](https://github.com/google/clasp) installed (`npm install -g @google/clasp`) to use the cli. Perform the following steps in this directory:

```bash
clasp login
clasp create-script --type standalone
clasp push
```

This will create an empty app script and push the code to that script. To run the script, you will need to open the script in the browser (you can use `clasp open-script`).

You will need to run `createTrigger` first to ensure that the trigger for the script to run nightly will be created. You can change the time of the trigger in the createTrigger function.

Now your script is ready to be automatically run! You can manually run the `sweep` function to make sure everything works. It's probably a good idea if you have a lot of emails that will be caught by your query as it'll take a long time with lots of emails!

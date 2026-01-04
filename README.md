# Gmail Sweeper

Google App Script that will automatically clean your inbox!

## Setup

Create a script called `constants.js` with the following content:

```js
const SPREADSHEET_ID = ""; // ID of spreadsheet, should be https://docs.google.com/spreadsheets/d/<ID_HERE>/edit
const SHEET_NAME = "" // Name of the sheet with configuration info
```

You need to have [clasp](https://github.com/google/clasp) installed (`npm install -g @google/clasp`) to use the cli. Perform the following steps in this directory:

```bash
clasp login
clasp push
```

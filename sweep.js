const INBOX_ONLY = true;

function sweep() {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    removeQuery("A2:A", 1, sheet);
    removeQuery("B2:B", 3, sheet);
    removeQuery("C2:C", 7, sheet);
    removeQuery("D2:D", 31, sheet);
}

function removeQuery(range, days, sheet) {
    const queries = sheet.getRange(range).getDisplayValues().flat().filter(a => a !== '');

    const query = queries.map(q => `(${q})`).join(' OR ');
    const dayQuery = days > 0 ? `before:${getDateDaysBefore(days)}` : "";
    const inboxQuery = INBOX_ONLY ? "in:inbox" : "";
    const fullQuery = `(${query}) ${dayQuery} ${inboxQuery}`;
    const threads = GmailApp.search(fullQuery);

    if (threads.length === 0) return;

    trashThreads(threads);
    console.log(`Deleted ${threads.length} items (>${days} day deletion)`);
}

const BATCH_SIZE = 100;

function trashThreads(threads) {
    for (let i = 0; i < threads.length; i += BATCH_SIZE) {
        const batch = threads.slice(i, i + BATCH_SIZE);
        GmailApp.moveThreadsToTrash(batch);
    }
}

function getDateDaysBefore(daysBefore) {
    const date = new Date();
    date.setDate(date.getDate() - daysBefore);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
}

function createTrigger() {
    ScriptApp.newTrigger("sweep")
        .timeBased()
        .atHour(3)
        .nearMinute(0)
        .everyDays(1)
        .create();
}

/**
 * Čelisti – voting backend.
 * Paste into the "Čelisti – hlasování" spreadsheet: Extensions → Apps Script,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 *
 * Tab "Hlasování": A = film, B = link (optional), C = vote count (formula).
 * Tab "Hlasy":     one row per voter: time, film, anonymous voter ID.
 * Each browser has one vote; voting again changes it.
 */

function doGet() {
  return json_({ ok: true, options: options_() });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const film = String(data.film || "").trim();
    const voter = String(data.voter || "").trim().slice(0, 64);
    if (!voter || !options_().some((o) => o.film === film)) return json_({ ok: false, error: "invalid" });

    const sheet = SpreadsheetApp.getActive().getSheetByName("Hlasy");
    const voters = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat();
    const i = voters.indexOf(voter);
    if (i >= 0) sheet.getRange(i + 2, 1, 1, 2).setValues([[new Date(), film]]);   // change of mind
    else sheet.appendRow([new Date(), film, voter]);
    SpreadsheetApp.flush();
    return json_({ ok: true, options: options_() });
  } finally {
    lock.releaseLock();
  }
}

function options_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Hlasování");
  const rows = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 3).getValues();
  const votes = SpreadsheetApp.getActive().getSheetByName("Hlasy").getDataRange().getValues().slice(1);
  return rows
    .filter((r) => String(r[0]).trim())
    .map((r) => {
      const film = String(r[0]).trim();
      return { film, url: String(r[1] || "").trim(), votes: votes.filter((v) => String(v[1]).trim() === film).length };
    });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

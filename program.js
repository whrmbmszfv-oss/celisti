// ─────────────────────────────────────────────────────────────
//  Settings + fallback program.
//  The site automatically shows the next screening that hasn't ended yet.
//  Each screening can override `time` and `place`; otherwise the defaults are used.
// ─────────────────────────────────────────────────────────────
window.PROGRAM = {
  // The program is edited in Google Sheets ("Čelisti – program filmových večerů").
  // The site reads that sheet live; the `screenings` list below is only a fallback
  // used if Google can't be reached. Empty cells in the sheet use the defaults below.
  sheetId: "1UMf1MhBputBrS1vk8zhGa31u90r4MprMUWdV-nk0Xdw",
  // Google Sheets API key (restricted to the Sheets API + bobinky.cz). Lets the site read links
  // stored in the film cells. Leave empty to use the plain CSV export (no links from cells).
  apiKey: "AIzaSyBnHIBkhaje2kYrsgSOec7DREDBzqyz7js",
  // Voting: URL of the Apps Script web app in the "Čelisti – hlasování" sheet (Deploy → Web app → /exec URL).
  // The options and their links are edited in that sheet. Until the URL is set, the shortlist below is shown without voting.
  voteUrl: "https://script.google.com/macros/s/AKfycbycuIgxA6Ztp0tq4hQf2IVU5IVUHxxVW_cx2itGJnkueQwm7f2sscns5lponzRgzUoB/exec",
  voteOptions: [
    { film: "The Room", url: "https://www.csfd.cz/film/270365-pokoj/prehled/" },
    { film: "Mega Shark vs. Giant Octopus", url: "https://www.csfd.cz/film/258268-megazralok-vs-obri-chobotnice/prehled/" },
    { film: "Fateful Findings", url: "https://www.csfd.cz/film/343384-fateful-findings/prehled/" },
    { film: "Samurai Cop", url: "https://www.csfd.cz/film/209259-policajt-samurai/prehled/" },
    { film: "Attack of the Killer Tomatoes!", url: "https://www.csfd.cz/film/82229-attack-of-the-killer-tomatoes/prehled/" },
  ],
  season: "Podzimní filmové večery",
  defaultTime: "19:00",
  durationHours: 3, // how long a screening "counts" as running (and calendar event length)
  defaultPlace: {
    name: "Kino Obývák",
    address: "Doplň adresu, Praha",
    // mapUrl: "https://mapy.com/s/xxxxx", // optional – otherwise a Mapy.com search for the address is used
  },
  screenings: [
    { date: "2026-10-22", film: "Čelisti (1975)", note: "Zahajovací večer. Kdo přinese popcorn, je hrdina." },
    { date: "2026-10-29", film: "" },
    { date: "2026-11-05", film: "" },
    { date: "2026-11-12", film: "" },
    { date: "2026-11-19", film: "" },
    { date: "2026-11-26", film: "", note: "Poslední večer sezóny." },
    // Example of an override:
    // { date: "2026-12-03", time: "20:00", film: "Amadeus", place: { name: "U Petra", address: "Ulice 1, Brno" } },
  ],
};

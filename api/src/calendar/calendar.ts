//for testing on local only
import { google, calendar_v3 } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

//dont edit this na
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  scope:
    "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

let Day = 7;
let minutes = 45;

// now + ?? days (1 = 24hr)
const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDate() + Day);

// now + ?? days (1 = 24hr) + ?? minutes
const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDate() + Day);
eventEndTime.setMinutes(eventEndTime.getMinutes() + minutes);

// Color ID kup
// Blue -> 1
// Green -> 2
// Purple -> 3
// Red -> 4
// Yellow -> 5
// Orange -> 6
// Turquoise -> 7
// Gray -> 8
// Bold Blue -> 9
// Bold Green -> 10
// bold red -> 11

const calendarEvent: calendar_v3.Schema$Event = {
  summary: `Test ` + Day + ` days and ` + minutes + ` minutes`,
  location: `Test location Mongkol Clinic`,
  description: `Test description`,
  colorId: "1",
  start: {
    dateTime: eventStartTime.toISOString(),
    timeZone: "Asia/Bangkok",
  },
  end: {
    dateTime: eventEndTime.toISOString(),
    timeZone: "Asia/Bangkok",
  },
};

calendar.freebusy.query(
  {
    requestBody: {
      timeMin: eventStartTime.toISOString(),
      timeMax: eventEndTime.toISOString(),
      timeZone: "Asia/Bangkok",
      items: [{ id: "primary" }],
    },
  },
  (err, res) => {
    if (err) {
      console.error("Free Busy Query Error: ", err.message);
      return;
    }

    const busyTimes = res?.data?.calendars?.primary?.busy || [];
    if (busyTimes.length === 0) {
      calendar.events.insert(
        { calendarId: "primary", requestBody: calendarEvent },
        (err) => {
          if (err) {
            console.error("Error Creating Calendar Event:", err.message);
          } else {
            console.log("Calendar event successfully created.");
          }
        }
      );
    } else {
      console.log("Sorry, I'm busy during that time.");
    }
  }
);

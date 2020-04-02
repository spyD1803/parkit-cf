// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const SENDGRID_KEY = functions.config().sendgrid.key;

const sgMail = require("@sendgrid/mail");
var moment = require("moment");

sgMail.setApiKey(SENDGRID_KEY);

exports.bookingConfirmed = functions.https.onRequest(async (req, response) => {
  const bookedAt = req.query.bookedAt || req.body.bookedAt || "booked at";
  const bookedBy = req.query.bookedBy || req.body.bookedBy || "bookedby";
  const forTime = req.query.for || req.body.for || "forTime";
  const from = req.query.from || req.body.from || "from";
  const on = req.query.on || req.body.on || "on";
  const spot = req.query.spot || req.body.spot || "spot";

  const formattedFromTime = moment(Number(from))
    .utcOffset(330)
    .format("h:mm a");
  const formattedToTime = moment(Number(from))
    .utcOffset(330)
    .add(Number(forTime), "hours")
    .format("h:mm a");

  // response.send({
  //   bookedAt,
  //   bookedBy,
  //   forTime,
  //   from,
  //   on,
  //   spot,
  //   formattedFromTime,
  //   formattedToTime
  // });

  const msg = {
    to: bookedBy || "sainath.b14@iiits.in",
    from: "yasaswini0305@gmail.com",
    subject: "Booking Confirmed",

    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
    <p>Heyy</p>
    <p>Your booking is confirmed. please find details</p>
    <p>Place: <strong>${spot}</strong></p>
    <p>Date: <strong>${moment(on).format("MMM DD, YYYY")}</strong></p>
    <p>Timings: <strong>${formattedFromTime} - ${formattedToTime}</strong></p>
    </div>`
  };
  console.log(msg);

  await sgMail.send(msg);
  response.send("email sent");
});

exports.bookingExtended = functions.https.onRequest(async (req, response) => {
  const bookedBy = req.query.bookedBy || req.body.bookedBy || "bookedby";
  const forTime = req.query.for || req.body.for || "forTime";
  const from = req.query.from || req.body.from || "from";
  const on = req.query.on || req.body.on || "on";
  const spot = req.query.spot || req.body.spot || "spot";

  const formattedFromTime = moment(Number(from))
    .utcOffset(330)
    .format("h:mm a");
  const formattedToTime = moment(Number(from))
    .utcOffset(330)
    .add(Number(forTime), "hours")
    .format("h:mm a");

  const msg = {
    to: bookedBy || "sainath.b14@iiits.in",
    from: "yasaswini0305@gmail.com",
    subject: "Booking Extended",

    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
    <p>Heyy</p>
    <p>Your booking is extended by an hour. please find details</p>
    <p>Place: <strong>${spot}</strong></p>
    <p>Date: <strong>${moment(on).format("MMM DD, YYYY")}</strong></p>
    <p>Timings: <strong>${formattedFromTime} - ${formattedToTime}</strong></p>
    </div>`
  };
  console.log(msg);

  await sgMail.send(msg);
  response.send("email sent");
});

exports.bookingCanceled = functions.https.onRequest(async (req, response) => {
  const bookedBy = req.query.bookedBy || req.body.bookedBy || "bookedby";
  const forTime = req.query.for || req.body.for || "forTime";
  const from = req.query.from || req.body.from || "from";
  const on = req.query.on || req.body.on || "on";
  const spot = req.query.spot || req.body.spot || "spot";

  const formattedFromTime = moment(Number(from))
    .utcOffset(330)
    .format("h:mm a");
  const formattedToTime = moment(Number(from))
    .utcOffset(330)
    .add(Number(forTime), "hours")
    .format("h:mm a");

  const msg = {
    to: bookedBy || "sainath.b14@iiits.in",
    from: "yasaswini0305@gmail.com",
    subject: "Booking Cancelled",

    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
    <p>Heyy</p>
    <p>Your booking is Cancelled. please find details</p>
    <p>Place: <strong>${spot}</strong></p>
    <p>Date: <strong>${moment(on).format("MMM DD, YYYY")}</strong></p>
    <p>Timings: <strong>${formattedFromTime} - ${formattedToTime}</strong></p>
    </div>`
  };
  console.log(msg);

  await sgMail.send(msg);
  response.send("email sent");
});

exports.verificationCode = functions.https.onRequest(async (req, response) => {
  const code = req.query.code || req.body.code || "000000";
  const bookedBy = req.query.email || req.body.email || "000000";

  const msg = {
    to: bookedBy || "sainath.b14@iiits.in",
    from: "yasaswini0305@gmail.com",
    subject: "Verification Code",

    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
    <p>Heyy</p>
    <p>Here is your  verfication code for Park IT</p>
    <p>code: <strong>${code}</strong></p>
    </div>`
  };
  console.log(msg);

  await sgMail.send(msg);
  response.send("email sent");
});

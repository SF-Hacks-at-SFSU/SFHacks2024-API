//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createHmac } from "crypto";
//get enviroment configuration
dotenv.config();

const PORT = process.env.API_KEY;
var app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/`);
});

//Sends an email confirming that the recepients application has been sent. Only Tally.so webhooks should be allowed to access the route.
app.post("/webhook/send-received-app-email", (req, res) => {
    console.log("Received Tally.so event:", req.url )
  const webhookPayload = req.body;
  const receivedSignature = req.headers["tally-signature"];

  const calculatedSignature = createHmac(
    "sha256",
    process.env.TALLY_SIGNING_SECRET
  )
    .update(JSON.stringify(webhookPayload))
    .digest("base64");

  // Compare the received signature with the calculated signature.
  if (receivedSignature !== calculatedSignature) {
    // Signature is invalid, reject the webhook request
    res.status(401).send("Invalid signature.");
    return;
  }

  const recepient_email = webhookPayload["data"]["fields"]
  

  

});

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
app.post("/webhook/send-received-app-email", async (req, res) => {
    console.log("Received Tally.so event:", req.url )
  const webhookPayload = req.body;
  const receivedToken = req.headers["api-token"];
  

  const calculatedSignature = createHmac(
    "sha256",
    process.env.TALLY_SIGNING_SECRET
  )
    .update(JSON.stringify(webhookPayload))
    .digest("base64");

  // Compare the received signature with the calculated signature.
  if (!(calculatedSignature == process.env.TALLY_SIGNING_SECRET)) {
    // Signature is valid, process the webhook payload
    res.status(401).send('Invalid signature.');
    
  } 
  
  console.log(webhookPayload)
  let email =  "";
    let receipient = ""
    for (const field of webhookPayload['data']['fields']) {
      if (field["key"]== "question_2Eylpp") {
        email = field["value"]
       
      }
      if (field["key"]== "question_rj1JeM") {
        receipient = field["value"]
       
      }
    }
  
    await sendConfirmedReceivedEmail(receipient, email)
    res.status(200).send('Webhook received and processed successfully.');

  
});

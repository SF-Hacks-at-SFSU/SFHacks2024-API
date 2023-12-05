//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
//get enviroment configuration
dotenv.config();

const PORT = process.env.API_KEY;
var app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/`);
});

app.post("webhook/send-received-app-email", (req, res) => {
  const webhookPayload = req.body;
  const receivedSignature = req.headers["tally-signature"];

  const calculatedSignature = createHmac(
    "sha256",
    process.env.TALLY_SIGNING_SECRET
  )
    .update(JSON.stringify(webhookPayload))
    .digest("base64");

  // Compare the received signature with the calculated signature
  if (receivedSignature !== calculatedSignature) {
     // Signature is invalid, reject the webhook request
     res.status(401).send("Invalid signature.");
     return;
  }
  



  
});

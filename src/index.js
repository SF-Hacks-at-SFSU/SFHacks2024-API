//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createHmac } from "crypto";
import { sendConfirmedReceivedEmail } from "./send_email";

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
try {
      console.log("Received Tally.so event:", req.url )
    
    
    const webhookPayload = req.body;
    const receivedToken = req.headers["api-token"];
    // Compare the received token with the calculated token.
    //TODO implement HMac function
    if (!(receivedToken === process.env.TALLY_SIGNING_SECRET)) res.status(401).send('Invalid signature.');
  
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
  
    sendConfirmedReceivedEmail(receipient, email)
    
  
  
    
} catch (error) {
  console.log("Error:", error)
  res.statusCode(500)
}
});

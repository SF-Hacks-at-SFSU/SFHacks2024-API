//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createHmac } from "crypto";
import { sendConfirmedReceivedEmail } from "./send_email.js";
import bodyParser from "body-parser";


//get enviroment configuration
dotenv.config();

const PORT = process.env.API_KEY;
var app = express();
app.use(bodyParser.json({limit: '50mb'}));  

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/`);
});

//Sends an email confirming that the recepients application has been sent. Only Tally.so webhooks should be allowed to access the route.
app.post("/webhook/send-received-app-email", async (req, res) => {
try {
    console.log("Received Tally.so event:", req.url )
    const webhookPayload = req.body.toString();
    const receivedSignature = req.headers['typeform-signature']
    
  
    const calculatedSignature = createHmac(
      "sha256",
      process.env.TYPEFORM_SIGNING_SECRET
    )
      .update(req.body.toStrin())
      .digest("base64");
  
    // Compare the received signature with the calculated signature.
    if (!(`sha256=${calculatedSignature}` === receivedSignature)) {
      // Signature is valid, process the webhook payload
      res.sendStatus(401)
      return
    } 

    console.log(webhookPayload)
    // let fname =  "";
    //   let receipient = ""
    //   for (const field of webhookPayload['data']['form_response']["definition"]["fields"]) {
    //     if (field["id"]== "") {
    //       receipient = field["value"]
         
    //     }
    //     if (field["key"]== "question_rj1JeM") {
    //       fname = field["value"]
         
    //     }
    //   }
    
    //   await sendConfirmedReceivedEmail(receipient, fname)
      res.sendStatus(200)
  
    
} catch (error) {
  res.sendStatus(500)
  console.log(error)
}
});

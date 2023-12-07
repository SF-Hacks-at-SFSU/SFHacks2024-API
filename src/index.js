//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createHmac } from "crypto";
import { sendConfirmedReceivedEmail } from "./utils/send_email.js";
import bodyParser from "body-parser";
import { verifySignature } from "./utils/verification.js";
import chalk from "chalk";

//get enviroment configuration
dotenv.config();

const PORT = process.env.PORT || 1000;
var app = express();
//middleware
app.use(express.raw({ type: "application/json", limit: "50mb" }));

//logging of all request
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;
  const ipAddress = req.ip || req.connection.remoteAddress;

  console.log(
    chalk.yellow(`[${timestamp}] ${method} ${url} from ${ipAddress}`)
  );

  next()
  
});

//Sends an email confirming that the recepients application has been sent. Only Tally.so webhooks should be allowed to access the route.
app.post("/webhook/send-registration-application-email", async (req, res) => {
  try {
    const payload = JSON.parse(req.body.toString());
    const signature = req.headers["typeform-signature"];
    const isValid = verifySignature(signature, req.body.toString());

    if (!isValid) {
      // Signature is not valid, bounce back unauthorized
      res.sendStatus(401);
      return;
    }

    var fName = "";
    var receipient = "";
    for (const answer of payload["form_response"]["answers"]) {
      //get email by checking entries email ID
      if (answer["field"]["id"] == "JV6k42Qo04CQ") receipient = answer["email"];

      //get first name by checking entries id
      if (answer["field"]["id"] == "TVV0PNJZg9Mz") fName = answer["text"];
    }

    //Sends email of confirmation
    await sendConfirmedReceivedEmail(receipient, fName);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT} `));
});

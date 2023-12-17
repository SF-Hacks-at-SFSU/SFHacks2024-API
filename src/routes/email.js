import { Router } from "express";
import { sendConfirmedReceivedEmail } from "../utils/send_email";

let _router = Router();

//Sends an email confirming that the recepients application has been sent. Only Typeform webhooks should be allowed to access the route.
_router.get("/confirm-registeration-application-received", async (req, res) => {
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

//Sends an email confirming that the recepients application has been sent. Only Typeform webhooks should be allowed to access the route.
_router.get("/confirm-registeration", async (req, res) => {
  try {
    
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

export const emailRoutes = _router;
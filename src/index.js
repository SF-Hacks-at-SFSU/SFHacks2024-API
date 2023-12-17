//imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createHmac } from "crypto";
import { sendConfirmedReceivedEmail } from "./utils/send_email.js";
import bodyParser from "body-parser";
import { verifySignature } from "./utils/verification.js";
import chalk from "chalk";
import { emailRoutes } from "./routes/email.js";

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


app.use("/email", emailRoutes) ;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT} `));
});

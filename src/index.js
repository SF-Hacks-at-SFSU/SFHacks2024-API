//imports
import express from "express";
import dotenv from "dotenv";
import { webhookRoutes } from "./routes/webhooks.js";

//get enviroment configuration
dotenv.config();

const PORT = process.env.PORT || 1000;
var app = express();

//middleware
app.use(express.raw({ type: "application/json", limit: "50mb" }));
app.set('view engine', 'ejs');

app.use("/webhooks", webhookRoutes);

//TODO Confirms the participant with the given `id` in DB passed will be attending.
app.post("/confirm-attendence-intent/:id", async (req, res) => {});

//TODO Displays a web page containing the name, email, and participation type of the participant with the provided id.
app.read("/check-in/:id", async (req, res) => {});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});

//log all request
app.on("request", (req, res) => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
});

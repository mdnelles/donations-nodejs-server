import express from "express";

//const express = require("express");
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
/* eslint-disable */
const env = require("dotenv").config().parsed;

import * as donate from "./routes/Donate";
import * as campaign from "./routes/Campaign";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const jsonParser = bodyParser.json();
const port = env.NODE_PORT || 5033;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.json());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(helmet());

//app.use("/user", users);
app.all("/campaigns_view", campaign.view);
app.all("/MarkDonatorAsFraud/:cid", campaign.fraud);
app.all("/campaigns_add", campaign.add);

app.all("/donate_add", donate.add);

if (env.NODE_ENV === "production") {
   // set static folder
   app.use(express.static("client/build"));
}

app.listen(port, function() {
   console.log("Server is running on port: " + port);
});

export default app;

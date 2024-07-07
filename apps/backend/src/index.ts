import cors from "cors";
import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

require("dotenv").config();

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const app = express();
const port = 5001;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/workspaces", (_, response) => {
  const workspaces = [
    { name: "api", version: "1.0.0" },
    { name: "types", version: "1.0.0" },
    { name: "web", version: "1.0.0" },
  ];
  response.json({ data: workspaces });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

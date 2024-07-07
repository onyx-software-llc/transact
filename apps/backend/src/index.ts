import cors from "cors";
import express, { Request, Response } from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import bodyParser from "body-parser";

require("dotenv").config();

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Change this for production env
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

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post(
  "/api/create_link_token",
  async function (req: Request, res: Response) {
    const clientUserId = req.body.user_id;
    const request = {
      user: { client_user_id: clientUserId },
      client_name: "Transact",
      products: ["auth"],
      language: "en",
      redirect_uri: "http://localhost:5173/dashboard",
      country_codes: ["US"],
    };
    try {
      const createTokenResponse = await plaidClient.linkTokenCreate(request);
      res.json(createTokenResponse.data);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

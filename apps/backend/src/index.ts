import cors from "cors";
import express, { Request, Response } from "express";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
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
app.use(cors({ origin: "http://localhost:5173" }));

app.post(
  "/api/create_link_token",
  async function (req: Request, res: Response) {
    const clientUserId = req.body.user_id;
    const request = {
      user: { client_user_id: clientUserId },
      client_name: "Transact",
      products: [Products.Auth],
      language: "en",
      redirect_uri: "http://localhost:5173/dashboard",
      country_codes: [CountryCode.Us],
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

app.post("/api/set_access_token", function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      const tokenResponse = await plaidClient.itemPublicTokenExchange({
        public_token: request.body.public_token,
      });

      console.info("access_token: ", tokenResponse.data.access_token);
      console.info("item_id: ", tokenResponse.data.item_id);

      response.json({
        // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
        // access_token: tokenResponse.data.access_token,
        item_id: tokenResponse.data.item_id,
        error: null,
      });
    })
    .catch(next);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// lib/Connector.js
import { UpdateType } from "@powersync/react-native";

/// Postgres Response codes that we cannot recover from by retrying.
const FATAL_RESPONSE_CODES = [
  // Class 22 — Data Exception
  // Examples include data type mismatch.
  new RegExp("^22...$"),
  // Class 23 — Integrity Constraint Violation.
  // Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
  new RegExp("^23...$"),
  // INSUFFICIENT PRIVILEGE - typically a row-level security violation
  new RegExp("^42501$"),
];

export class Connector {
  constructor() {
    // Setup a connection to your server for uploads
    //   this.serverConnectionClient = TODO;
  }

  async fetchCredentials() {
    // Implement fetchCredentials to obtain a JWT from your authentication service.
    // See https://docs.powersync.com/installation/authentication-setup
    // If you're using Supabase or Firebase, you can re-use the JWT from those clients, see
    // - https://docs.powersync.com/installation/authentication-setup/supabase-auth
    // - https://docs.powersync.com/installation/authentication-setup/firebase-auth
    return {
      endpoint: process.env.EXPO_PUBLIC_POWERSYNC_ENDPOINT!,
      // Use a development token (see Authentication Setup https://docs.powersync.com/installation/authentication-setup/development-tokens) to get up and running quickly
      token: process.env.DEV_POWERSYNC_AUTH_TOKEN!,
    };
  }

  async uploadData(database: any) {}
  // Implement uploadData to send local changes to your backend service.
  // You can omit this method if you only want to sync data from the database to the client

  // See example implementation here:https://docs.powersync.com/client-sdk-references/react-native-and-expo#3-integrate-with-your-backend
}

import { PowerSyncDatabase } from "@powersync/react-native";
import { Connector } from "./connector";
import { AppSchema } from "./schema";

/**
 * Instantiate the local PowerSync database
 * This uses react-native-quick-sqlite to open a SQLite database file
 */
export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: "powersync.db",
  },
});

export const setupPowerSync = async () => {
  const connector = new Connector();
  db.connect(connector);
};

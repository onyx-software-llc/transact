import { column, Schema, Table } from "@powersync/react-native";

const hello_world = new Table(
  {
    // id column (text) is automatically included
    message: column.text,
    new_column: column.integer,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  hello_world,
});

export type Database = (typeof AppSchema)["types"];

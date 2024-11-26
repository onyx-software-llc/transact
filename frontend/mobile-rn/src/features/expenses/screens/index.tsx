import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TODO: Move this to a provider at the root layout after init
import { db } from "@/lib/sync/db";

export default function ExpensesScreen() {
  useEffect(() => {
    const abortController = new AbortController();

    // const fetch = async () => {
    //   console.log("fetching messages");
    //   try {
    //     const messages = await db.getAll("SELECT * FROM hello_world");
    //     console.log("messages", messages);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
    // fetch();

    db.watch(
      "SELECT * FROM hello_world",
      [],
      { onResult: (result) => console.log(result.rows?._array) },
      { signal: abortController.signal }
    );

    return () => abortController.abort();
  }, []);

  return (
    <SafeAreaView className="flex justify-center items-center w-full h-full">
      <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Expenses
      </Text>
    </SafeAreaView>
  );
}

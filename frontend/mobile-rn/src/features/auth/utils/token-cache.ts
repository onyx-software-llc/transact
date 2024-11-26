import * as SecureStore from "expo-secure-store";

const getToken = async (key: string) => {
  try {
    const item = await SecureStore.getItemAsync(key);
    if (item) {
      console.log(`${key} was used 🔐 \n`);
    } else {
      console.log("No values stored under key: " + key);
    }
    return item;
  } catch (error) {
    console.error("SecureStore get item error: ", error);
    await SecureStore.deleteItemAsync(key);
    return null;
  }
};

const saveToken = async (key: string, value: string) => {
  try {
    return SecureStore.setItemAsync(key, value);
  } catch (err) {
    return;
  }
};

const clearToken = async (key: string) => {
  console.log(`Deleting ${key} 🔐 \n`);
  await SecureStore.deleteItemAsync(key);
};

export default {
  getToken,
  saveToken,
  clearToken,
};

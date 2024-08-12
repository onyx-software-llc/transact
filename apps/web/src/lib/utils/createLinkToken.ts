import axios from "axios";

/**
 * Send a request to the server that will
 * @param userId
 * @returns
 */
export const createLinkToken = async (userId: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/create_link_token",
      { user_id: userId }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not create link token");
  }
};

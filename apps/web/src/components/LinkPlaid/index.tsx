import axios from "axios";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

interface LinkPlaidProps {
  linkToken: string;
}
export default function LinkPlaid({ linkToken }: LinkPlaidProps) {
  const onSuccess = useCallback(async (public_token: any, metadata: any) => {
    // const response = fetch("/api/set_access_token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ public_token }),
    // });

    const response = await axios.post(
      "http://localhost:5001/api/set_access_token",
      { public_token }
    );

    console.log("metadata", metadata);
    console.log("response", response);
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
}

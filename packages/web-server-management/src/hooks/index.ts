import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { desensitizeString } from "../utils";

export const useLocalAuthToken = () => {
  const [authToken, setAuthToken] = useLocalStorageState<string>(
    "COME_ADMIN_AUTH_TOKEN",
    {
      defaultValue: "",
      serializer: (value) => value,
      deserializer: (value) => value,
    },
  );

  const desensitizeAuthToken = useMemo(() => {
    return desensitizeString(authToken);
  }, [authToken]);

  return {
    authToken,
    desensitizeAuthToken,
    setAuthToken,
  };
};

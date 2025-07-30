import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { desensitizeString } from "../utils";
import { SiteService } from "../service/base";

export interface SiteSettings {
  adminAuthToken?: string;
  serviceUrl?: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorageState<SiteSettings>(
    "COME_ADMIN_SETTINGS",
  );

  console.debug("settings", settings);

  const desensitizeAuthToken = useMemo(() => {
    return desensitizeString(settings?.adminAuthToken);
  }, [settings?.adminAuthToken]);

  return {
    settings,
    setSettings,
    desensitizeAuthToken,
  };
};

export const useSiteService = (): SiteService | null => {
  const { settings } = useSettings();
  return useMemo(() => {
    if (settings?.serviceUrl && settings?.adminAuthToken) {
      return new SiteService(settings.serviceUrl, settings.adminAuthToken);
    }
    return null;
  }, [settings]);
};

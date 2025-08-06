import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { SiteService } from "../service/base";

export interface ManagementSettings {
  adminAuthToken?: string;
  serviceUrl?: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorageState<ManagementSettings>(
    "COME_ADMIN_SETTINGS",
    { listenStorageChange: true },
  );

  return {
    settings,
    setSettings,
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

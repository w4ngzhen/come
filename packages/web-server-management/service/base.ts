import axios, { AxiosInstance } from "axios";
import { PageInfo, PageResult, ResponseData, SitePage } from "@come/common";

const BASE_URL = "http://localhost:8787/management";

export class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      baseURL: BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      // set admin auth token
      const token = localStorage.getItem("COME_ADMIN_AUTH_TOKEN");
      if (!token) {
        throw new Error("admin auth token is missing");
      }
      config.headers["ADMIN_AUTH_TOKEN"] = token;
      return config;
    });

    // handle response adjust @come/server worker API
    instance.interceptors.response.use(
      (resp) => {
        const unwrappedResponse = resp.data as ResponseData;
        if (unwrappedResponse.success) {
          return unwrappedResponse.data as any;
        }
        throw new Error(unwrappedResponse.errorMessage || "unknown error");
      },
      (err) => {
        console.error(err);
        const errData = err.response?.data as ResponseData;
        if (errData) {
          throw new Error(
            errData.errorMessage ||
              `API invoked failed: ${err.code ?? "unknown error"}`,
          );
        }
        throw new Error(`API invoked failed: ${err.code ?? "unknown error"}`);
      },
    );

    this.axiosInstance = instance;
  }

  test(): Promise<ResponseData> {
    return this.axiosInstance.get("/");
  }
}

class SiteService extends BaseService {
  async getSitePagesByPagination(params: {
    pageInfo: PageInfo;
  }): Promise<PageResult<SitePage>> {
    const { pageInfo } = params;
    return this.axiosInstance.get("/site-pages", {
      params: {
        ...pageInfo,
      },
    });
  }
}

const SITE_SERVICE = new SiteService();
export { SITE_SERVICE };

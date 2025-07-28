import axios, { AxiosInstance } from "axios";
import { PageInfo, PageResult, ResponseData, Comment } from "@come/common";
import { message } from "antd";

const BASE_URL = "http://test.local:8787/management-api";

export class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      baseURL: BASE_URL,
    });

    instance.interceptors.request.use((config) => {
      // set admin auth token from localStorage
      const token = localStorage.getItem("COME_ADMIN_AUTH_TOKEN");
      if (!token) {
        throw new Error("admin auth token is missing");
      }
      config.headers["X-COME-ADMIN-AUTH-TOKEN"] = token;
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
        console.error("API invoking error", err);

        if (err.status === 401) {
          // 用户认证失败，跳转只token设置页面
          message.error("token验证失败，即将跳转token设置页面", 2).then(() => {
            localStorage.removeItem("COME_ADMIN_AUTH_TOKEN");
            window.location.href = "/token-management";
          });
        }

        const errData = err.response?.data as ResponseData;
        if (errData) {
          throw new Error(
            errData.errorMessage ||
              `API invoked failed: ${err.code ?? "unknown error"}`,
          );
        }
        if (err instanceof Error) {
          throw err;
        }
        throw new Error(`API invoked failed: ${err.code ?? "unknown error"}`);
      },
    );

    this.axiosInstance = instance;
  }
}

class SiteService extends BaseService {
  async queryCommentsWithPagination(params: {
    pageInfo: PageInfo;
  }): Promise<PageResult<Comment>> {
    const { pageInfo } = params;
    return this.axiosInstance.get("/comments", {
      params: {
        ...pageInfo,
      },
    });
  }
}

const SITE_SERVICE = new SiteService();
export { SITE_SERVICE };

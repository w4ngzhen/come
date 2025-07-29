import axios, { AxiosInstance } from "axios";
import { PageInfo, PageResult, Result, Comment, SortInfo } from "@come/common";
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
        const unwrappedResponse = resp.data as Result;
        if (unwrappedResponse.success) {
          return unwrappedResponse.data as any;
        }
        throw new Error(unwrappedResponse.err_msg || "unknown error");
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

        const errData = err.response?.data as Result;
        if (errData) {
          throw new Error(
            errData.err_msg ||
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

export type QueryCommentsFilter = {
  user_nickname?: string;
  content?: string;
  status?: Array<number>;
};

class SiteService extends BaseService {
  async queryComments(params: {
    pageInfo?: PageInfo;
    sorterInfo?: SortInfo;
    filters?: QueryCommentsFilter;
  }): Promise<PageResult<Comment>> {
    const { pageInfo, sorterInfo, filters } = params;
    return this.axiosInstance.get("/comments", {
      params: {
        ...pageInfo,
        ...sorterInfo,
        ...filters,
        status: filters?.status?.join(",") || "",
      },
    });
  }
}

const SITE_SERVICE = new SiteService();
export { SITE_SERVICE };

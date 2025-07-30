import axios, { AxiosInstance } from "axios";
import { PageInfo, PageResult, Result, Comment, SortInfo } from "@come/common";
import { message } from "antd";

export class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor(serviceUrl: string, adminAuthToken: string) {
    const instance = axios.create({
      baseURL: serviceUrl,
    });

    instance.interceptors.request.use((config) => {
      if (!adminAuthToken) {
        throw new Error("admin auth token is missing");
      }
      config.headers["X-COME-ADMIN-AUTH-TOKEN"] = adminAuthToken;
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
            window.location.href = "/settings-management";
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

export class SiteService extends BaseService {
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

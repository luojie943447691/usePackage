import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';

export type ReponseEntity<T> = {
  state: number;
  content: T;
  message: string;
};

export class Axios<T = never> {
  static _instance: AxiosInstance;
  static _axios: Axios;
  // axios:
  constructor(options?: AxiosRequestConfig<T>) {
    Axios._instance = axios.create(options);

    // 做一些请求拦截、 token 的添加
    Axios._instance.interceptors.request.use();
    // 响应
    Axios._instance.interceptors.response.use(response => {
      const { status: state, statusText: message, data } = response.data;
      if (state === 200 || state === 301) {
        return {
          state,
          message,
          data,
        };
      } else if (state === 401) {
        // 重新登陆
      } else {
        return {
          state,
          message,
        };
      }
    });
  }

  async get(url: string, options?: AxiosRequestConfig<T>): Promise<T> {
    return axios.get(url, options);
  }

  static instance() {
    return this._instance;
  }

  static get axios() {
    return this._axios;
  }
}

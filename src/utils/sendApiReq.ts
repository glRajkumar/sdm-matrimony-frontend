import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { getServerSideToken } from "../server/utils";
import { getToken } from "@/actions";
import { root } from './endPoints';

type SendApiReqParams = AxiosRequestConfig & {
  isAuthendicated?: boolean;
  headers?: AxiosRequestConfig["headers"]
};

type CustomError = Error & { status?: number };

const requestIntercepter = (instance: AxiosInstance, isAuthendicated: boolean, headers: AxiosRequestConfig["headers"]): void => {
  instance.interceptors.request.use(
    async function (config: any) {
      if (isAuthendicated) {
        if (typeof window === 'undefined') {
          const token = await getServerSideToken()
          config.headers = {
            Authorization: "Bearer " + token,
            ...headers
          }

        } else {
          const token = getToken()
          config.headers = {
            Authorization: "Bearer " + token,
            ...headers
          }
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  )
}

const responseIntercepter = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    error => {
      const err: CustomError = new Error(error?.message)
      err.status = error?.response?.status
      err.message = error?.response?.data?.message
      throw err
    }
  )
}

const sendApiReq = ({ isAuthendicated = true, headers = {}, ...others }: SendApiReqParams): Promise<any> => {
  const instance = axios.create({ baseURL: root.baseUrl })
  requestIntercepter(instance, isAuthendicated, headers)
  responseIntercepter(instance)
  return instance({ ...others })
}

export default sendApiReq;

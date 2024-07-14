import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from 'js-cookie';

import { root } from './endPoints';

const token = Cookies.get('sdm')
console.log("token", token)

type SendApiReqParams = AxiosRequestConfig & {
  isAuthendicated?: boolean;
  headers?: AxiosRequestConfig["headers"]
};

type CustomError = Error & { status?: number };

const requestIntercepter = (instance: AxiosInstance, isAuthendicated: boolean, headers: AxiosRequestConfig["headers"]): void => {
  instance.interceptors.request.use(
    function (config: any) {
      console.log("tokentokentoken", token)
      if (isAuthendicated) {
        config.headers = {
          Authorization: "Bearer " + token,
          ...headers
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

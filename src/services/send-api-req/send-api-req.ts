import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { getServerSideToken } from "@/server/utils";
import { getToken, removeToken, setToken } from "@/actions";
import { endPoints, root } from './end-points';

type SendApiReqParams = AxiosRequestConfig & {
  isAuthendicated?: boolean;
  headers?: AxiosRequestConfig["headers"]
};

type CustomError = Error & { status?: number };

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}> = [];

const processQueue = (error: Error | null, newToken: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    }
    else if (newToken && config.headers) {
      config.headers.Authorization = `Bearer ${newToken}`
      resolve(config)
    }
  })

  failedQueue = []
}

const refreshAccessToken = async (): Promise<string> => {
  const response = await axios.post(
    `${root.baseUrl}${endPoints.getAccessToken}`,
    {},
    { withCredentials: true }
  )

  const { access_token } = response.data

  setToken(access_token)
  return access_token
}

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
    async (error) => {
      const originalRequest = error.config

      if (
        error?.response?.status === 401 &&
        !originalRequest._retry &&
        typeof window !== 'undefined' &&
        originalRequest.headers?.Authorization
      ) {
        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
              config: originalRequest
            });
          })
            .then(config => instance(config as AxiosRequestConfig))
            .catch(err => Promise.reject(err))
        }

        isRefreshing = true

        try {
          const newToken = await refreshAccessToken()
          console.log(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          processQueue(null, newToken)
          return instance(originalRequest)

        } catch (refreshError) {
          if (typeof window !== 'undefined') {
            removeToken()
            window.location.href = "/"
          }

          const err: CustomError = new Error("Authentication failed")
          err.status = 401
          err.message = "Your session has expired. Please log in again."
          throw err

        } finally {
          isRefreshing = false
        }
      }

      const err: CustomError = new Error(error?.message)
      err.status = error?.response?.status
      err.message = error?.response?.data?.message
      throw err
    }
  )
}

export const sendApiReq = ({ isAuthendicated = true, headers = {}, ...others }: SendApiReqParams): Promise<any> => {
  const instance = axios.create({ baseURL: root.baseUrl })
  requestIntercepter(instance, isAuthendicated, headers)
  responseIntercepter(instance)
  return instance({ ...others })
}

export const manualRefreshToken = refreshAccessToken

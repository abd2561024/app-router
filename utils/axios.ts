import client from 'axios';
import { API_DOMAIN, AUTH_PASSWORD, AUTH_USERNAME } from '@/constants/credentials';

export type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosResponseTransformer } from 'axios';

function getExtraHeader(meta: string) {
  if (typeof document === 'undefined') return '';

  return decodeURIComponent(document.querySelector(`meta[name="${meta}"]`)?.getAttribute('content') ?? '');
}

export const axios = client.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
  auth: {
    username: AUTH_USERNAME,
    password: AUTH_PASSWORD,
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-session-id': getExtraHeader('session-id'),
    'x-xsrf-token': getExtraHeader('xsrf-token'),
    'x-country-code': getExtraHeader('country-code'),
  },
});

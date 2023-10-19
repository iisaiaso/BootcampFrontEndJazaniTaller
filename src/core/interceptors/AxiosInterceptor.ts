import axios, { InternalAxiosRequestConfig, type AxiosRequestConfig } from 'axios';
import { LocalStorageSession } from '../sessions';
import { type UserSecurityResponse } from '@/Auth/login/domain';
import { error } from 'console';

const AxiosInterceptor = (): void => {
	axios.interceptors.request.use(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		(config: AxiosRequestConfig) => {
			config.headers = {
				...config.headers,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			};

			const isValidAuth = LocalStorageSession.isValidationAuthorization();

			if (isValidAuth) {
				const user: UserSecurityResponse = LocalStorageSession.getAuthorization();
				const security = user.security;

				config.headers.Authorization = `${security.tokenType} ${security.accesTocken}`;
			}
			console.log('interceptor');

			return config;
		},
		async error => await Promise.reject(error),
	);
	axios.interceptors.response.use(
		response => response,
		async error => await Promise.reject(error),
	);
};

export default AxiosInterceptor;

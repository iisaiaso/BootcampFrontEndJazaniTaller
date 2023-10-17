import axios, { type AxiosResponse } from 'axios';
import { type OfficeResponse } from '../domain';

export const findAll = async (): Promise<AxiosResponse<OfficeResponse[]>> =>
	axios.get<OfficeResponse[]>('https://localhost:7079/api/office');

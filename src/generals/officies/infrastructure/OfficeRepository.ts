import axios, { type AxiosResponse } from 'axios';
import { type OfficeResponse } from '../domain';

export const findAll = async (): Promise<OfficeResponse[]> => {
	const response: AxiosResponse<OfficeResponse[]> = await axios.get<OfficeResponse[]>(
		'https://localhost:7079/api/office',
	);
	return response.data;
};

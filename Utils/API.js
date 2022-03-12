import axios from 'axios';

const endpoint1 = 'http://ip-api.com';

export const axiosInstance1 = axios.create({
	baseURL: endpoint1,
});

const endpoint2 =
	'http://api.openweathermap.org';

export const axiosInstance2 = axios.create({
	baseURL: endpoint2,
});

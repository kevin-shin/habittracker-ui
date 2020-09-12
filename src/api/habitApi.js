import axios from 'axios';
import * as settings from '../../appsettings.json';

const axiosInstance = axios.create({
    baseURL: settings["API_URL"]
});

export default axiosInstance;
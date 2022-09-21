import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    paramsSerializer: params => queryString.stringify(params),
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    }
})

export default axiosClient;
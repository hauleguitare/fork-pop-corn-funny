import { IParams, ListResponse } from '@src/@types/__global__';
import axiosClient from '../config';


export async function fetchMovies<T>(type: string, endpoint: string){
    let _url = `/${type}/${endpoint}`;
    var params = {
        api_key : process.env.REACT_APP_API_KEY
    }
    return axiosClient.get<ListResponse<T>>(_url, {params}).then((res) => res.data);
}


import { IGenres } from '@src/@types/__movies__';
import axiosClient from '../config';

export async function fetchGenres(type: string){
    let _url = `/genre/${type}/list`;
    var params = {
        api_key : process.env.REACT_APP_API_KEY
    }
    return axiosClient.get<IGenres>(_url, {params}).then((res) => res.data);
}
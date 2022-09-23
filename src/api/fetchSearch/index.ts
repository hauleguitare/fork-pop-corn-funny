import { IParams, ListResponse } from '@src/@types/__global__';
import { ISearchResult } from '@src/@types/__movies__';
import axiosClient from '../config';


export async function fetchSearch(type: string, query: IParams, page: number){
    let _url = `/search/${type}`;
    var params = {
        api_key : process.env.REACT_APP_API_KEY,
        page: page,
        ...query
    }
    return axiosClient.get<ListResponse<ISearchResult>>(_url, {params}).then((res) => res.data);
}
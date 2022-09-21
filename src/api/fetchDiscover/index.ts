import { IParams, ListResponse } from "@src/@types/__global__";
import axiosClient from "../config";

export async function fetchDiscover<T>(page: number, type: string, query: IParams = {}){
    let _url = `/discover/${type}`;
    var params ={
        api_key: process.env.REACT_APP_API_KEY,
        page: page,
        ...query
    }
    return axiosClient.get<ListResponse<T>>(_url, {params}).then((res) => res.data);
}
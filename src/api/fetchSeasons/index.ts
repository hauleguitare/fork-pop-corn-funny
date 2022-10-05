import { ISeasons } from "@src/@types/__movies__";
import axiosClient from "../config";

export async function fetchSeason(movieId: number, seasonNumber: number){
    let _url = `/tv/${movieId}/season/${seasonNumber}`;
    var params = {
        api_key : process.env.REACT_APP_API_KEY
    }
    return axiosClient.get<ISeasons>(_url, {params}).then((res) => res.data);
}
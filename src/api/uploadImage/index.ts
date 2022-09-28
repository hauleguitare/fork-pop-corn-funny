import { IResponseImgur } from "@src/@types/__global__";
import axios from "axios";

export async function uploadImage(params: FormData):Promise<IResponseImgur> {
    const auth = 'Client-ID ' + process.env.REACT_APP_IMGUR_CLIENT_ID;
    const req = axios({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: params,
        headers: {
            Authorization: auth,
            'Content-Type': 'multipart/form-data',
          },
    });
    return req.then((res) => {return res.data});
}
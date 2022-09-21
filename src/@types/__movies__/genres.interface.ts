import { Identification } from "../__global__";

export interface IGenres {
    genres: IGenre[]
}

export interface IGenre extends Identification{
    id: number,
    name: string,
}
import { ListResponse } from "@src/@types/__global__";
import { IAbstractMovie } from "../abstract-movies.interface";

export interface ISimilar {
    similar: ListResponse<IAbstractMovie>;
}

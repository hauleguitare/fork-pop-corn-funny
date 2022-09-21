import { ICategory } from "./category.interface";

export interface ISectionType{
    id: string,
    name: string,
    type: ICategory[]
}
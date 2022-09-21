import { ICategory } from "./category.interface";


// interface support for dividing sections in application, etc... Section for airing today will display movie lists about airing today,...
export interface ISectionType{
    id: string,
    name: string,
    type: ICategory[]
}
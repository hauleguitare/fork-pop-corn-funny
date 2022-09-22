import { ICategory } from "./category.interface";


// interface support for dividing sections in application, etc... Section for airing today will display movie lists about airing today,...
export interface IContentSection {
    id: string,
    name: string,
    type: ICategory[]
}

export interface IBannerSection {
    time_windows?: string;
    id: string,
    name: string,
    type: ICategory[]
}
import { ICategory } from "./category.interface"

export interface IMenuList extends ICategory {
    url?: string
    dropdownMenu?: IMenuList[]
}
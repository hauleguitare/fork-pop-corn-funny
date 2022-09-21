import { ICategory } from "./category.interface"

// Interface for menu list
export interface IMenuList extends ICategory {
    url?: string
    dropdownMenu?: IMenuList[] // dropdown for menu if exist otherwise undefined
}
// interface supports section for application etc... movies section, menu list
export interface ICategory{
    id: string,
    name: string,
    type?: ICategory[]
}
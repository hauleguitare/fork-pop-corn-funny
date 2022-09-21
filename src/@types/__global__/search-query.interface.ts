export interface IParams {
    [key: string]: string | undefined;
}

export interface ISEARCH_QUERY{
    genre: string[],
    sort_by: string[],
    minRuntime: string[],
    maxRuntime: string[],
    from: string[],
    to: string[],
    language: string[],
    include_adult: string[],
};

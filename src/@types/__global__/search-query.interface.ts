
// interface support for fetching data from api with parameters passed from searchParams hooks
export interface IParams {
    [key: string]: string | undefined;
}


// interface supports collection of fields from searchParams when user uses Discover pages or search Pages
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

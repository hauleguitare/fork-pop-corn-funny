// The generic interface supports returning a list of data, the number of pages, the current page, and the total number of data.
export interface ListResponse<T> {
    page:          number;
    results:       T[];
    dates?:         Dates;
    total_pages:   number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}


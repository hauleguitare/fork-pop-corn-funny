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


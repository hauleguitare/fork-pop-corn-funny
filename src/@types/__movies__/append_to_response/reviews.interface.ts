import { ListResponse } from "@src/@types/__global__";

export interface IReviews {
    reviews: ListResponse<Result>;
}

export interface Result {
    author:         string;
    author_details: AuthorDetails;
    content:        string;
    created_at:     Date;
    id:             string;
    updated_at:     Date;
    url:            string;
}

export interface AuthorDetails {
    name:        string;
    username:    string;
    avatar_path: string;
    rating:      number | null;
}

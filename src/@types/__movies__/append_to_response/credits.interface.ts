export interface ICredits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          string;
    job?:                 string;
}

export interface Videos{
    results: VideoDetail[];
}

interface VideoDetail{
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: Date;
    id:           string;
}
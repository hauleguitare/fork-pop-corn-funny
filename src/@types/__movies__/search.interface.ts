
export interface ISearchResult {
    backdrop_path?:        string;
    first_air_date?:       Date;
    genre_ids?:            number[];
    id:                    number;
    media_type:            MediaTypeSearch;
    name?:                 string;
    origin_country?:       string[];
    original_language?:    string;
    original_name?:        string;
    overview?:             string;
    popularity:            number;
    poster_path?:          string;
    vote_average?:         number;
    vote_count?:           number;
    adult?:                boolean;
    original_title?:       string;
    release_date?:         Date;
    title?:                string;
    video?:                boolean;
    gender?:               number;
    known_for?:            KnownFor[];
    known_for_department?: string;
    profile_path?:         string;
}

export interface KnownFor {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    media_type:        MediaTypeSearch;
    original_language: string;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum MediaTypeSearch {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}



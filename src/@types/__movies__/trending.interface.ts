export interface ITrending {
    adult:             boolean;
    backdrop_path:     string | null;
    id:                number;
    name?:             string;
    original_language: string;
    original_name?:    string;
    overview:          string;
    poster_path:       string | null;
    media_type:        MediaTypeTrending;
    genre_ids:         number[];
    popularity:        number;
    first_air_date?:   Date;
    vote_average:      number;
    vote_count:        number;
    origin_country?:   string[];
    title?:            string;
    original_title?:   string;
    release_date?:     Date;
    video?:            boolean;
}

export enum MediaTypeTrending {
    Movie = "movie",
    Tv = "tv",
}


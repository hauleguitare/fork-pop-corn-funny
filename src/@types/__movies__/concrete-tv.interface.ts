import { ProductionCountry, SpokenLanguage } from "./abstract-movies.interface";
import { IGenre } from "./genres.interface";

export interface IDetailTV {
    adult:                boolean;
    backdrop_path:        string | null;
    created_by:           CreatedBy[];
    episode_run_time:     any[];
    first_air_date:       Date;
    genres:               IGenre[];
    homepage:             string;
    id:                   number;
    in_production:        boolean;
    languages:            string[];
    last_air_date:        Date;
    last_episode_to_air:  TEpisodeToAir;
    name:                 string;
    next_episode_to_air:  TEpisodeToAir;
    networks:             Network[];
    number_of_episodes:   number;
    number_of_seasons:    number;
    origin_country:       string[];
    original_language:    string;
    original_name:        string;
    overview:             string;
    popularity:           number;
    poster_path:          string | null;
    production_companies: Network[];
    production_countries: ProductionCountry[];
    seasons:              Season[];
    spoken_languages:     SpokenLanguage[];
    status:               string;
    tagline:              string;
    type:                 string;
    vote_average:         number;
    vote_count:           number;
}

export interface CreatedBy {
    id:           number;
    credit_id:    string;
    name:         string;
    gender:       number;
    profile_path: string;
}

export interface TEpisodeToAir {
    air_date:        Date;
    episode_number:  number;
    id:              number;
    name:            string;
    overview:        string;
    production_code: string;
    runtime:         number;
    season_number:   number;
    show_id:         number;
    still_path:      string;
    vote_average:    number;
    vote_count:      number;
}

export interface Network {
    id:             number;
    name:           string;
    logo_path:      null | string;
    origin_country: string;
}


export interface Season {
    air_date:      Date;
    episode_count: number;
    id:            number;
    name:          string;
    overview:      string;
    poster_path:   string;
    season_number: number;
}



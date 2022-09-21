import { Identification } from "../__global__";
import { CreatedBy, Network, Season, TEpisodeToAir } from "./concrete-tv.interface";

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      null;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}


// -------------------------------------------------------- Movie -------------------------------------------------------- //
export interface IAbstractMovie{
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title?:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date?:      Date;
    title?:             string;
    video?:             boolean;
    vote_average:      number;
    vote_count:        number;
    first_air_date?:    Date;
    name?:              string;
    origin_country?:    string[];
    original_name?:     string;
}

// -------------------------------------------------------- Movie Details -------------------------------------------------------- //

export interface IDetailAbstractMovie extends IAbstractMovie{
    genres: Identification[],
    seasons?: Season[],
    created_by?: CreatedBy[],
    in_production: boolean,
    homepage: string | null,
    languages: string[],
    status: string,
    last_air_date: Date,
    last_episode_to_air?: TEpisodeToAir,
    next_episode_to_air?: TEpisodeToAir,
    networks?: Network[],
    production_companies: Network[],
    production_countries: ProductionCountry[],
    episode_run_time: number[],
    number_of_episodes: number,
    number_of_seasons: number,
    spoken_languages: SpokenLanguage[],
    tagline: string,
    type: string,
    belongs_to_collection?: any;
    budget?: number;
    imdb_id?: string;
    revenue?: number;
}












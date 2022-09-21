import { ProductionCompany, ProductionCountry, SpokenLanguage } from "./abstract-movies.interface";
import { IGenre } from "./genres.interface";

export interface IDetailMovie {
    adult:                 boolean;
    backdrop_path:         string | null;
    belongs_to_collection: null;
    budget:                number;
    genres:                IGenre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string | null;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}
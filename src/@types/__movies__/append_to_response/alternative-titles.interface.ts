export interface IAlternativeTitles {
    alternative_titles: AlternativeTitlesClass;
}

export interface AlternativeTitlesClass {
    titles: Title[];
}

export interface Title {
    iso_3166_1: string;
    title:      string;
    type:       string;
}

export interface Translations {
    translations: TranslationsClass;
}

export interface TranslationsClass {
    translations: Translation[];
}

export interface Translation {
    iso_3166_1:   string;
    iso_639_1:    string;
    name:         string;
    english_name: string;
    data:         Data;
}

export interface Data {
    homepage: string;
    overview: string;
    runtime:  number;
    tagline:  string;
    title:    string;
}

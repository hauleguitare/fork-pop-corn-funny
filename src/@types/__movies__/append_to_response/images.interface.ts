export interface Images {
    images: ImagesClass;
}

export interface ImagesClass {
    backdrops: Backdrop[];
    logos:     Backdrop[];
    posters:   Backdrop[];
}

export interface Backdrop {
    aspect_ratio: number;
    height:       number;
    iso_639_1:    null | string;
    file_path:    string;
    vote_average: number;
    vote_count:   number;
    width:        number;
}

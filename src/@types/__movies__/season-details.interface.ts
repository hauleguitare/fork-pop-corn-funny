export interface ISeasons {
    _id:           string;
    air_date:      Date;
    episodes:      Episode[];
    name:          string;
    overview:      string;
    id:            number;
    poster_path:   string;
    season_number: number;
}

export interface Episode {
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
    crew:            Crew[];
    guest_stars:     Crew[];
}

export interface Crew {
    job?:                 Job;
    department?:          Department;
    credit_id:            string;
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: KnownForDepartment;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    character?:           string;
    order?:               number;
}

export enum Department {
    Camera = "Camera",
    Directing = "Directing",
    Writing = "Writing",
}

export enum Job {
    Director = "Director",
    DirectorOfPhotography = "Director of Photography",
    Story = "Story",
    Teleplay = "Teleplay",
    Writer = "Writer",
}

export enum KnownForDepartment {
    Acting = "Acting",
    Camera = "Camera",
    Production = "Production",
    Writing = "Writing",
}

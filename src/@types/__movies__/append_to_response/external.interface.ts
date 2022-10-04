export interface IExternal {
    external_ids: ExternalIDS;
}

export interface ExternalIDS {
    id?: number
    imdb_id:      string | null;
    facebook_id:  string | null;
    instagram_id: string | null;
    twitter_id:   string | null;
}

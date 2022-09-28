export interface IResponseImgur {
    data:    ImgurData;
    success: boolean;
    status:  number;
}


export interface ImgurData {
    id:            string;
    title:         string | null;
    description:   string | null;
    datetime:      number;
    type:          string;
    animated:      boolean;
    width:         number;
    height:        number;
    size:          number;
    views:         number;
    bandwidth:     number;
    vote:          number | null;
    favorite:      boolean;
    nsfw:          null;
    section:       null;
    account_url:   null;
    account_id:    number;
    is_ad:         boolean;
    in_most_viral: boolean;
    has_sound:     boolean;
    tags:          any[];
    ad_type:       number;
    ad_url:        string;
    edited:        string;
    in_gallery:    boolean;
    deletehash:    string;
    name:          string;
    link:          string;
}

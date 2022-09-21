import { IMenuList } from "@src/@types/__global__/menu-list.interface";


// menu list displayed on navbar
const MENU_LIST: IMenuList[] =[
    {
        id: 'movie',
        name: 'movies',
        dropdownMenu: [
            {
                id: 'movie_popular',
                name: 'popular',
                url: '/movie'
            },
            {
                id: 'movie_top-rated',
                name: 'top rated',
                url: '/top-rated'
            },
            {
                id: 'movie_now-playing',
                name: 'now playing',
                url: '/now-playing'
            },
            {
                id: 'movie_upcoming',
                name: 'up coming',
                url: '/upcoming'
            }
        ]
    },
    {
        id: 'tv',
        name: 'tv shows',
        dropdownMenu: [
            {
                id: 'tv_popular',
                name: 'popular',
                url: '/tv'
            },
            {
                id: 'tv_top-rated',
                name: 'top rated',
                url: '/top-rated'
            },
            {
                id: 'tv_airing-today',
                name: 'airing today',
                url: '/airing-today'
            },
            {
                id: 'tv_on-tv',
                name: 'on tv',
                url: '/on-tv'
            }
        ]
    },
    {
        id: 'people',
        name: 'people',
        dropdownMenu: [{
            id: 'people_popular',
            name: 'popular',
            url: '/popular'
        }]
    },
    {
        id: 'more',
        name: 'more',
        dropdownMenu: [
            {
                id: 'more_information',
                name: 'information',
                url: '/information'
            },
            {
                id: 'more_support',
                name: 'support',
                url: '/support'
            }
        ]
    },
];

export default MENU_LIST;
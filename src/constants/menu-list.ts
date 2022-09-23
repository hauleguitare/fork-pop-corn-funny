import { IMenuList } from "@src/@types/__global__/menu-list.interface";


// menu list displayed header
export const MENU_LIST: IMenuList[] =[
    {
        id: 'movie',
        name: 'movies',
        url: '/movie',
        dropdownMenu: [
            {
                id: 'movie_popular',
                name: 'popular',
                url: '/popular'
            },
            {
                id: 'movie_top-rated',
                name: 'top rated',
                url: '/top_rated'
            },
            {
                id: 'movie_now-playing',
                name: 'now playing',
                url: '/now_playing'
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
        url: '/tv',
        dropdownMenu: [
            {
                id: 'tv_popular',
                name: 'popular',
                url: '/popular'
            },
            {
                id: 'tv_top-rated',
                name: 'top rated',
                url: '/top_rated'
            },
            {
                id: 'tv_airing-today',
                name: 'airing today',
                url: '/airing_today'
            },
            {
                id: 'tv_on-tv',
                name: 'on tv',
                url: '/on_tv'
            }
        ]
    },
    {
        id: 'people',
        name: 'people',
        url: '/people',
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


// This is list menu list for navbar when using mobile
export const MENU_LIST_NAVBAR : IMenuList[] = [
    {
        id: 'home',
        name: 'Home',
        url: '/'
    },
    {
        id: 'discover',
        name: 'Discover',
        url:'/discover'
    },
    {
        id: 'search',
        name: 'Search',
        url: '/search'
    },
    ...MENU_LIST
]
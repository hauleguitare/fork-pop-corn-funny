import { ICategory } from "@src/@types/__global__";

// section for trending displayed the Home Pages
export const TRENDING_SECTION = {
    time_windows: ['day', 'week'],
    id: 'trending',
    name: 'trending',
    type: [
        {
            id: 'all',
            name: 'all'
        },
        {
            id: 'movie',
            name: 'movies'
        },
        {
            id: 'tv',
            name: 'tv shows'
        }
    ]
}

// section for popular displayed the Home Pages
export const POPULAR_SECTION = {
    id: 'popular',
    name: 'popular',
    type: [
        {
            id: 'movie',
            name: 'movies'
        },
        {
            id: 'tv',
            name: 'tv shows'
        }
    ]
}

// section for top rated displayed the Home Pages
export const TOPRATED_SECTION = {
    id: 'top_rated',
    name: 'top rated',
    type: [
        {
            id: 'movie',
            name: 'movies'
        },
        {
            id: 'tv',
            name: 'tv shows'
        }
    ]
}

// section for on tv displayed the Home Pages
export const ONTV_SECTION = {
    id: 'on_the_air',
    name: 'on the air',
    type: [
        {
            id: 'tv',
            name: 'tv shows'
        }
    ]
}

// section for up coming displayed the Home Pages
export const UPCOMING_SECTION = {
    id: 'upcoming',
    name: 'upcoming',
    type: [
        {
            id: 'movie',
            name: 'movies'
        }
    ]
}

// section for airing today displayed the Home Pages
export const AIRINGTODAY_SECTION = {
    id: 'airing_today',
    name: 'aringtoday',
    type: [
        {
            id: 'tv',
            name: 'tv shows'
        }
    ]
}
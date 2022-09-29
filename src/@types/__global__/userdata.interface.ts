export interface IUserData {
    uid: string,
    images: {
        photoURL: string,
        bannerURL: string,
    },
    information: {
        
        displayName: string,
        email: string,
        description: string
    },
    recently: any[],
    watchlist: any[]
}

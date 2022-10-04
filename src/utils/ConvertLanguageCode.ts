export const ConvertLanguageCode = (langCode: string | undefined) =>{
    if (!langCode){
        return ''
    }
    switch(langCode){
        case 'en':
            return 'English'
        case 'vi':
            return 'Viet Nam'
        case 'ja':
            return 'Japanese'
        }   
}
export const ConvertBeautifulURL =(id?: number, title?: string) =>{
    if (!id || !title){
        return;
    }
    const stringReplace = title.replace(/[^\w\s]/gi, '');
    const newArr = stringReplace?.toLocaleLowerCase().split(' ');
    newArr.push(`${id?.toString()}`);
    return newArr.join('-');
}
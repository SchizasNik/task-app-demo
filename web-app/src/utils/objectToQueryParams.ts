export const objectToQueryParams = (o: any) => {
    if ( !o ) {
        return ''
    }
    const params = Object.keys(o).map( key => {
        let value = o[key]
        if ( value instanceof Array ) {
            value = value.join(',')
        }
        return `${key}=${value}`
    }).join('&')
    return params ? '?' + params : ''
}
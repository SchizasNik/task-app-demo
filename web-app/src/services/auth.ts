let token = ''

export const getToken = () => {
    if ( !token ) {
        token = localStorage['token'] || ''
    }
    return token
}

export const setToken = (_token: string) => {
    localStorage['token'] = _token
    token = _token
}
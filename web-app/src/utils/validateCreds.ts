export const validateCreds = (username: string, password: string) => {
    if ( username.length < 5 ) {
        return 'Username must be at least 5 characters long'
    } else if ( password.length < 6 ) {
        return 'Password must be at least 6 characters long'
    }
    return null
}
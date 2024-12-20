const numRegex = /^\d*(\.|\.\d)?$/

export const validateHours = (hours: string) => {
    if ( !numRegex.test(hours) ) {
        return false
    }
    if ( hours && + hours > 24 ) {
        return false
    }
    if ( hours.length > 4 ) {
        return false
    }
    return true
}
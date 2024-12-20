export const paginationSlice = <T>(arr: T[], page: number, page_size: number) => {
    return arr.slice( (page-1)*page_size, page*page_size )
}
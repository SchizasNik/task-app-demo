export const tryGet = (getter, v?) => {
    try {
        return getter();
    } catch (error) {
        return v;
    }
}
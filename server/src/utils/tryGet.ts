export function tryGet(getter:any, fallback:any | null){
    try {
        const out = getter();
        if (typeof out === 'undefined') return fallback;
        return out;
    } catch (error) {
        return fallback;
    }
};

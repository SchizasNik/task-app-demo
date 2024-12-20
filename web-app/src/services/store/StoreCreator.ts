import { string } from "prop-types";

export class SingleStore<T> implements Store<T> {
    private v: T;
    private listeners: Subscription<T>[] = [];
    constructor (v: T) {
        this.v = v;
    }
    subscribe (clb: Subscription<T>): Unsubscription {
        this.listeners.push(clb);
        return () => {
            this.listeners = this.listeners.filter( o => o != clb )
        }
    }
    get (): T {
        return this.v;
    }
    set (v: T) {
        this.v = v;
        this.listeners.forEach( c => c(v) )
    }
}

type Subscription<T> = (v: T) => void;

type Unsubscription = () => void;

type Storify<T> = {
    [P in keyof T]: Store<T[P]>;
}

export type Store<T> = {
    subscribe (clb: Subscription<T>): Unsubscription
    get (): T
    set (v: T)
}

const bindUnsubs = <T>(store: Store<T>, unsubs: Unsubscription[]): Store<T> => {
    return {
        subscribe: (clb: Subscription<T>) => {
            const unsub = store.subscribe(clb);
            unsubs.push(unsub);
            return unsub;
        },
        get: () => store.get(),
        set: (v: T) => store.set(v)
    }
}

type Leavable = {
    leave: Unsubscription
}

export type StoreAccess<T> = Storify<T> & Leavable;

export const makeStoreAccess = <T>(store: Storify<T>) : StoreAccess<T> => {
    const unsubs: Unsubscription[] = [];
    const binded_store = {} as Storify<T>;
    for (const k in store) {
        binded_store[k] = bindUnsubs(store[k], unsubs);
    }
    const leave = () => unsubs.forEach(o => o());
    return {
        ...binded_store,
        leave
    };
}
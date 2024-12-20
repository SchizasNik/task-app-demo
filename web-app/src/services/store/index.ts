import { SingleStore, makeStoreAccess } from './StoreCreator';
import { User, UserPrefs, UserRoleEnum, Profile } from 'types';
import { default_user_prefs } from 'values/defaults';

export const AppStore = {
    user: new SingleStore<User | undefined>(undefined),
    prefs: new SingleStore<UserPrefs>(default_user_prefs),
    role: new SingleStore<UserRoleEnum>('user')
}

export const accessStore = () => makeStoreAccess(AppStore);

export const storeProfile = (profile: Profile) => {
    AppStore.role.set(profile.role.role)
    AppStore.prefs.set(profile.preferences)
    AppStore.user.set(profile.user)
}

export const getUserId = () => {
    const user = AppStore.user.get()
    return user && user.id || ''
}

export const getUserRole = () => {
    return AppStore.role.get()
}
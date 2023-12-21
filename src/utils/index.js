export const isClient = (userInfo) => {
    return userInfo.role === 'client'
}
export const ADMIN_ONLY = ['admin'];
export const CLIENT_ONLY = ['client'];
export const ALL = ['admin', 'client'];
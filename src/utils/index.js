export const isClient = (userInfo) => {
    return userInfo.role === 'client'
}
export const ADMIN_ONLY = ['admin'];
export const CLIENT_ONLY = ['client'];
export const ALL = ['admin', 'client'];

export const COLLECTION = {
    USERS: "users",
    BOOKS: "books",
    BORROW_HISTORY: "borrow_history",
}

export const formatDate = (timeDate) => {
    return new Date(timeDate).toDateString();
}
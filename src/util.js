
export function pretty(obj){
    return JSON.stringify(obj, null, 2)
}

export function generateHash() {
    return Math.random().toString(36).substring(2, 26);
}

export function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

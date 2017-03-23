export function getUser(state, id, tier = 'full') {
    return state.getIn(['users', id]);
}

export function getEvent(state, id, tier = 'full') {
    const event = state.getIn(['events', id]);
    if (tier === 'full')
        return event;
    else { // return event without orders
        return event.get('tickets').reduce((acc, val) => {
            return acc.deleteIn(['tickets', val.get('id'), 'orders']);
        }, event);
    }
}
import {Map, fromJS} from 'immutable';

export function events(eventState = Map(), action) {
    switch (action.type) {
        case 'CREATE_EVENT':
            return eventState.set(action.id, fromJS({
                id: action.id,
                name: action.name,
                startDateTime: action.startDateTime,
                endDateTime: action.endDateTime,
                description: action.description,
                hash: action.hash,
                room: action.room,
                performers: [],
                venue: {},
                promoter: action.userId,
                tickets: {}
            }));
        case 'DELETE_EVENT':
        case 'UPDATE_EVENT':
        case 'CREATE_VENUE':
            return eventState.setIn([action.eventId, 'venue', action.id], fromJS({
                id: action.id,
                name: action.name,
                address: action.address,
                phoneNumber: action.phoneNumber
            }));
        case 'DELETE_VENUE':
        case 'UPDATE_VENUE':
        case 'CREATE_ORDER':
            return eventState.setIn([action.eventId, 'tickets', action.ticketId, 'orders', action.id], fromJS({
                id: action.id,
                orderType: action.orderType,
                price: action.price,
                status: action.status
            }));
        case 'DELETE_ORDER':
        case 'UPDATE_ORDER':
        case 'CREATE_TICKET':
            return eventState.setIn([action.eventId, 'tickets', action.id], fromJS({
                id: action.id,
                name: action.name,
                orders: {}
            }));
        case 'DELETE_TICKET':
        case 'UPDATE_TICKET':
        case 'CREATE_PERFORMER':
            return eventState.setIn([action.eventId, 'performers', action.id], fromJS({
                id: action.id,
                name: action.name
            }));
    }

    return eventState;
}
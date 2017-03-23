import {Map, fromJS} from "immutable";

export function users(userState = Map(), action) {
    if (!action.userId && action.type !== 'CREATE_USER')
        return userState;

    switch (action.type) {
        case 'CREATE_USER':
            return userState.set(action.id, fromJS({
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                passwordHash: action.passwordHash,
                classification: action.classification,
                hash: action.hash,
                room: action.room,
                host: {},
                patron: {},
            }));
        case 'DELETE_USER':
        case 'UPDATE_USER':
        case 'CREATE_EVENT':
            return userState.setIn([action.userId, 'host', action.id], fromJS({
                id: action.id,
                name: action.name,
                startDateTime: action.startDateTime,
                endDateTime: action.endDateTime,
                description: action.description
            }));
        case 'DELETE_EVENT':
        case 'UPDATE_EVENT':
        case 'CREATE_ORDER':
            return userState.setIn([action.userId, 'patron', action.eventId, action.ticketId, action.id], fromJS({
                id: action.id,
                orderType: action.orderType,
                price: action.price,
                status: action.status
            }));
        case 'DELETE_ORDER':
        case 'UPDATE_ORDER':
        case 'CREATE_VENUE':
            return userState.setIn([action.userId, 'host', action.eventId, 'venue'], fromJS({
                id: action.id,
                name: action.name,
                address: action.address,
                phoneNumber: action.phoneNumber
            }));
        case 'CREATE_PERFORMER':
            return userState.setIn([action.userId, 'host', action.eventId, 'performers', action.id],
                fromJS({
                    id: action.id,
                    name: action.name
                })
            );
        case 'CREATE_TICKET':
            return userState.setIn([action.userId, 'host', action.eventId, 'tickets', action.id],
                fromJS({
                    id: action.id,
                    name: action.name,
                })
            );
    }

    return userState;
}
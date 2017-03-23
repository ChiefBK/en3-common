import {generateHash} from '../util';

export function createUser(id, firstName, lastName, email, passwordHash, classification) {
    const hash = generateHash();
    const room = generateHash();

    return {
        type: 'CREATE_USER',
        id,
        firstName,
        lastName,
        email,
        passwordHash,
        classification,
        hash,
        room
    };
}

export function createEvent(id, name, startDateTime, endDateTime, description, userId) {
    const hash = generateHash();
    const room = generateHash();

    return {
        type: 'CREATE_EVENT',
        id,
        name,
        startDateTime,
        endDateTime,
        description,
        userId,
        hash,
        room
    };
}

export function createVenue(id, name, address, phoneNumber, eventId, userId) {
    return {
        type: 'CREATE_VENUE',
        id,
        name,
        address,
        phoneNumber,
        eventId,
        userId
    };
}

export function createPerformer(id, name, eventId, userId) {
    return {
        type: 'CREATE_PERFORMER',
        id,
        name,
        eventId,
        userId
    }
}

export function createTicket(id, name, eventId, userId) {
    return {
        type: 'CREATE_TICKET',
        id,
        name,
        userId,
        eventId
    }
}

export function createOrder(id, orderType, price, status, eventId, ticketId, userId) {
    return {
        type: 'CREATE_ORDER',
        id,
        price,
        orderType,
        status,
        ticketId,
        userId,
        eventId
    }
}

export function createPromoter(id, eventId) {
    return {
        type: 'CREATE_PROMOTER',
        id,
        eventId,
        userId: id
    }
}
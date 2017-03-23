import {getUser, getEvent} from "./state";
import Event from "./models/event";
import {generateId} from "./util";
import {createUser, createEvent, createVenue, createTicket, createOrder} from "./actions/actions";

export function handleReadUser(event, socket, io) {
    return function (dispatch, getState) {
        const outboundEvent = new Event(event.eventId);

        const u = getUser(getState(), event.id);
        outboundEvent.setPayload(u);

        if (io) {
            const userRoom = u.get('room');
            socket.join(userRoom);
            io.to(userRoom).emit('create-user', outboundEvent.toObject());
        }
        else {
            socket.emit('create-user', outboundEvent.toObject());
        }
    };
}

export function handleReadEvent(event, socket, io) {
    return function (dispatch, getState) {
        const outboundEvent = new Event(event.eventId);

        const e = getEvent(getState(), event.id, event.tier);
        const eventRoom = e.get('room');
        socket.join(eventRoom);

        outboundEvent.setPayload(e);

        io.to(eventRoom).emit('create-event', outboundEvent.toObject());
    };
}

export function handleCreateUser(event, socket, io) {
    return function (dispatch, getState) {
        const outgoingEvent = new Event(event.eventId);

        const payload = event.payload;
        dispatch(createUser(payload.id, payload.firstName, payload.lastName, payload.email, payload.passwordHash, payload.classification));

        const hostingEventIds = Object.keys(payload.host);

        for (let i = 0; i < hostingEventIds.length; i++) {
            const event = payload['host'][hostingEventIds[i]];
            if (event)
                dispatch(createEvent(event.id, event.name, event.startDateTime, event.endDateTime, event.description, payload.id));

            const venue = payload['host'][hostingEventIds[i]]['venue'];
            if (venue)
                dispatch(createVenue(venue.id, venue.name, venue.address, venue.phoneNumber, event.id, payload.id));

            const ticketIds = Object.keys(payload['host'][event.id]['tickets']);

            for (let j = 0; j < ticketIds.length; j++) {
                const ticket = payload['host'][event.id]['tickets'][ticketIds[j]];
                if (ticket)
                    dispatch(createTicket(ticket.id, ticket.name, hostingEventIds[i], payload.id));
            }

            for (let eventId in payload.patron) {
                const e = payload.patron[eventId];
                for (let ticketId in e) {
                    const t = e[ticketId];
                    for (let orderId in t) {
                        const o = t[orderId];
                        dispatch(createOrder(o.id, o.orderType, o.price, o.status, eventId, ticketId, payload.id));
                    }
                }
            }
        }

        if (io) {
            const createdUser = getUser(getState(), userId);
            outgoingEvent.setPayload(createdUser);
            socket.join(createdUser.get('room'));
            io.to(createdUser.get('room')).emit('create-user', event.toObject());
        }
    };
}

export function handleCreateEvent(event, socket, io) {
    return function (dispatch, getState) {
        const outgoingEvent = new Event(event.eventId);

        const payload = event.payload;
        const eventId = payload.id;

        const promoterId = payload.promoter;
        dispatch(createUser(promoterId, undefined, undefined, undefined, undefined, 'client'));
        dispatch(createEvent(eventId, payload.name, payload.startDateTime, payload.endDateTime, payload.description, payload.userId));

        const venueId = Object.keys(payload.venue)[0];
        const venue = payload.venue[venueId];

        dispatch(createVenue(venueId, venue.name, venue.address, venue.phoneNumber, eventId, promoterId));

        const tickets = payload.tickets;

        for(const ticketId in tickets) {
            const ticket = tickets[ticketId];
            dispatch(createTicket(ticketId, ticket.name, eventId, promoterId));

            const orders = ticket.orders;

            for(const orderId in orders) {
                const order = orders[orderId];
                dispatch(createOrder(orderId, order.orderType, order.price, order.status, eventId, ticketId))
            }
        }


        if (io) {
            const createdEvent = getEvent(getState(), eventId);
            outgoingEvent.setPayload(createdEvent);
            socket.join(createdEvent.get('room'));
            io.to(createdEvent.get('room')).emit('create-event', outgoingEvent.toObject());
        }
    };
}

export function handleAuth(event, socket, io) {
    return function (dispatch, getState) {
        const outgoingEvent = new Event(event.eventId);
        const state = getState();

        const userEmail = event.email;
        const userPassHash = event.passwordHash;

        const user = state.get('items').find((item) => {
            return item.get('email') == userEmail && item.get('passwordHash') == userPassHash;
        });
        outgoingEvent.setPayload(user);

        socket.emit('auth', outgoingEvent.toObject());
        socket.emit('create', outgoingEvent.toObject());
    }
}


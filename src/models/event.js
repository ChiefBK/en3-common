import {Map} from "immutable";

class Event {
    constructor(eventId, payload) {
        this.eventId = eventId;
        this.payload = payload;
        this.id = undefined;
        this.tier = undefined;
    }

    //TODO - create 'group' and 'item' array keys in payload
    setPayload(object) {
        if (Map.isMap(object)) {
            object = object.toJS();
        }
        this.payload = object;
    }

    toObject() {
        return {
            eventId: this.eventId,
            id: this.id,
            payload: this.payload,
            tier: this.tier
        }
    }
}

export default Event;
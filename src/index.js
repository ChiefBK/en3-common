import Event from "./models/event";
import View from "./models/view";
import EventView from "./models/eventView";
import UserView from "./models/userView";
import {getUser, getEvent} from "./state";
import {pretty, generateHash, generateId} from "./util";
import * as actions from "./actions/actions";
import {events} from "./reducers/eventReducer";
import {users} from "./reducers/userReducer";
import {handleReadEvent, handleAuth, handleCreateEvent, handleCreateUser, handleReadUser} from './receiveEvents';

exports.Event = Event;
exports.View = View;
exports.UserView = UserView;
exports.EventView = EventView;

exports.pretty = pretty;
exports.generateHash = generateHash;
exports.generateId = generateId;

exports.createUser = actions.createUser;
exports.createOrder = actions.createOrder;
exports.createTicket = actions.createTicket;
exports.createVenue = actions.createVenue;
exports.createPerformer = actions.createPerformer;
exports.createPromoter = actions.createPromoter;
exports.createEvent = actions.createEvent;

exports.handleCreateUser = handleCreateUser;
exports.handleCreateEvent = handleCreateEvent;
exports.handleAuth = handleAuth;
exports.handleReadEvent = handleReadEvent;
exports.handleReadUser = handleReadUser;

exports.eventReducer = events;
exports.userReducer = users;

exports.getUser = getUser;
exports.getEvent = getEvent;


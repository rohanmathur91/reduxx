"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
var lodash_1 = require("lodash");
var createStore = function (initialState, reducers) {
    var state = (0, lodash_1.cloneDeep)(initialState);
    var subscribers = new Set();
    var getState = function () { return state; };
    var dispatch = function (action) {
        // TODO: validate if action is object with type propoerty or not
        state = reducers(state, action);
        // Notify all the subscribers with the updated state
        subscribers.forEach(function (subscriber) { return subscriber(state); });
    };
    var subscribe = function (cb) {
        subscribers.add(cb);
        return function () { return subscribers.delete(cb); };
    };
    return { getState: getState, subscribe: subscribe, dispatch: dispatch };
};
exports.createStore = createStore;

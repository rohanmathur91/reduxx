'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = createStore;
const lodash_1 = require("lodash");
function createStore(initialState, reducers) {
    let state = (0, lodash_1.cloneDeep)(initialState);
    const subscribers = new Set();
    function getState() {
        return state;
    }
    function dispatch(action) {
        // TODO: validate if action is object with type propoerty or not
        state = reducers(state, action);
        // Notify all the subscribers with the updated state
        subscribers.forEach((subscriber) => subscriber(state));
    }
    function subscribe(cb) {
        subscribers.add(cb);
        return () => subscribers.delete(cb);
    }
    return { getState, subscribe, dispatch };
}
//# sourceMappingURL=core.js.map

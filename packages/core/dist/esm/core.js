import { cloneDeep } from 'lodash';

function createStore(initialState, reducers) {
    let state = cloneDeep(initialState);
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

export { createStore };
//# sourceMappingURL=core.js.map

import * as lodash from "lodash";

export function createStore<State, Action>(
  initialState: State,
  reducers: (state: State, action: Action) => State,
) {
  let state = lodash.cloneDeep(initialState);
  const subscribers = new Set<(state: State) => void>();

  function getState(): State {
    return state;
  }

  function dispatch(action: Action) {
    // TODO: validate if action is object with type propoerty or not
    state = reducers(state, action);

    // Notify all the subscribers with the updated state
    subscribers.forEach((subscriber) => subscriber(state));
  }

  function subscribe(cb: (state: State) => void) {
    subscribers.add(cb);

    return () => subscribers.delete(cb);
  }

  return { getState, subscribe, dispatch };
}

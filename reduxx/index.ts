import { cloneDeep } from "lodash";

export const createStore = <State, Action>(
  initialState: State,
  reducers: (state: State, action: Action) => State,
) => {
  let state = cloneDeep(initialState);
  const subscribers = new Set<(state: State) => void>();

  const getState = (): State => state;

  const dispatch = (action: Action) => {
    // TODO: validate if action is object with type propoerty or not
    state = reducers(state, action);

    // Notify all the subscribers with the updated state
    subscribers.forEach((subscriber) => subscriber(state));
  };

  const subscribe = (cb: (state: State) => void) => {
    subscribers.add(cb);

    return () => subscribers.delete(cb);
  };

  return { getState, subscribe, dispatch };
};

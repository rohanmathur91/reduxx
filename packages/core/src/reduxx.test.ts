import { describe, it, expect, vi } from "vitest";
import { createStore } from ".";

type InitialState = {
  count: number;
};

export type Action =
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number }
  | { type: "INCREMENT_BY"; payload: number }
  | { type: "DECREMENT_BY"; payload: number }
  | { type: "SET"; payload: number };

const reducers = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "INCREMENT_BY":
      return { ...state, count: state.count + action.payload };
    case "DECREMENT_BY":
      return { ...state, count: state.count - action.payload };
    case "SET":
      return { ...state, count: action.payload };

    default:
      throw new Error("Action type not found!");
  }
};

describe("reduxx", () => {
  it("should initialize the store", () => {
    const initialState: InitialState = { count: 0 };
    const store = createStore(initialState, reducers);
    expect(store.getState()).toEqual({ count: 0 });
  });

  it("should update state in the store", () => {
    const initialState: InitialState = { count: 0 };
    const store = createStore(initialState, reducers);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toEqual({ count: 1 });

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toEqual({ count: 2 });

    store.dispatch({ type: "DECREMENT" });
    expect(store.getState()).toEqual({ count: 1 });

    store.dispatch({ type: "DECREMENT" });
    expect(store.getState()).toEqual({ count: 0 });
  });

  it("should notify subscribers with updated state", () => {
    const initialState: InitialState = { count: 0 };
    const store = createStore(initialState, reducers);
    const mockSubscribers = { subscriber1: (state: InitialState): void => {} };
    vi.spyOn(mockSubscribers, "subscriber1");

    store.subscribe(mockSubscribers.subscriber1);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toEqual({ count: 1 });

    expect(mockSubscribers.subscriber1).toBeCalledTimes(1);

    store.dispatch({ type: "DECREMENT" });
    expect(store.getState()).toEqual({ count: 0 });

    expect(mockSubscribers.subscriber1).toBeCalledTimes(2);
  });
});

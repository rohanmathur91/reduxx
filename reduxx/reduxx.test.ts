import { describe, it, expect } from "vitest";
import { createStore } from "./";

type InitialState = {
  count: number;
};

type Action =
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number };

const reducers = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
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
});

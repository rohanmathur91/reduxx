import { createStore } from ".";

const rangeInput = document.querySelector(".range") as HTMLInputElement;
const container = document.querySelector(".container") as HTMLDivElement;

export type InitialState = {
  count: number;
};

export type Action =
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number }
  | { type: "INCREMENT_BY"; payload: number }
  | { type: "DECREMENT_BY"; payload: number }
  | { type: "SET"; payload: number };

export const reducers = (state: InitialState, action: Action) => {
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

const initialState: InitialState = { count: 0 };
const store = createStore(initialState, reducers);
const state = store.getState();

// initial render state
rangeInput.value = `${state.count}`;
container.innerHTML = `${state.count}`;

store.subscribe((state) => console.log(`State updated :: ${state.count}`));

// update UI when state updates
store.subscribe((state) => {
  rangeInput.value = `${state.count}`;
  container.innerHTML = `${state.count}`;
});

rangeInput?.addEventListener("input", (e) => {
  const updatedValue = (e.target as HTMLInputElement).value;

  store.dispatch({
    type: "SET",
    payload: Number(updatedValue),
  });

  //   rangeInput.value = updatedValue;
  //   container.innerHTML = updatedValue;
});

// window.dispatch = store.dispatch;

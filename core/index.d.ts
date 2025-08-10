export declare const createStore: <State, Action>(initialState: State, reducers: (state: State, action: Action) => State) => {
    getState: () => State;
    subscribe: (cb: (state: State) => void) => () => boolean;
    dispatch: (action: Action) => void;
};
//# sourceMappingURL=index.d.ts.map
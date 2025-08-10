export declare function createStore<State, Action>(initialState: State, reducers: (state: State, action: Action) => State): {
    getState: () => State;
    subscribe: (cb: (state: State) => void) => () => boolean;
    dispatch: (action: Action) => void;
};
//# sourceMappingURL=core.d.ts.map
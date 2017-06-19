const fakeStore = state => ({
    default: () => { },
    subscribe: () => { },
    dispatch: () => { },
    getState: () => ({ ...state }),
});

export default fakeStore;

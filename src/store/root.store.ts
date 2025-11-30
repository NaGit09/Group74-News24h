import { configureStore } from '@reduxjs/toolkit';
import { counterStore } from './counter.store';
// register root store
export const store = configureStore({
    reducer: {
        counter: counterStore.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
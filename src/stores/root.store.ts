import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './article.store';

// register root store
export const store = configureStore({
    reducer: {
        article: articleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
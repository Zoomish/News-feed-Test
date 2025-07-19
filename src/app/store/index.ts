import postsReducer from "@/entities/post/model/postsSlice";
import searchReducer from "@/features/search/model/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

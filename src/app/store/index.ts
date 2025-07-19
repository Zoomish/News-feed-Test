import { postApi } from "@/entities/post/model/postApi"; // если используешь RTK Query
import postsReducer from "@/entities/post/model/postsSlice";
import searchReducer from "@/entities/post/model/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

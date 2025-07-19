import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";

interface PostsState {
    allPosts: Post[];
    total: number;
}

const initialState: PostsState = {
    allPosts: [],
    total: 0,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setAllPosts(
            state,
            action: PayloadAction<{ posts: Post[]; total: number }>,
        ) {
            state.allPosts = [...state.allPosts, ...action.payload.posts];
            state.total = action.payload.total;
        },
        clearAllPosts(state) {
            state.allPosts = [];
            state.total = 0;
        },
    },
});

export const { setAllPosts, clearAllPosts } = postsSlice.actions;
export default postsSlice.reducer;

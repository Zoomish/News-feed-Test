import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";

interface PostsState {
    posts: Post[];
    total: number;
}

const initialState: PostsState = {
    posts: [],
    total: 0,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(
            state,
            action: PayloadAction<{ posts: Post[]; total: number }>,
        ) {
            state.posts = action.payload.posts;
            state.total = action.payload.total;
        },
        appendPosts(state, action: PayloadAction<{ posts: Post[] }>) {
            state.posts = [...state.posts, ...action.payload.posts];
        },
    },
});

export const { setPosts, appendPosts } = postsSlice.actions;
export default postsSlice.reducer;

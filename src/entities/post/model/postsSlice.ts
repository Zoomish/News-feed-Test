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
            const newPosts = action.payload.posts;
            const existingIds = new Set(state.posts.map((p) => p.id));
            const filteredPosts = newPosts.filter(
                (p) => !existingIds.has(p.id),
            );
            state.posts = [...state.posts, ...filteredPosts];
        },
    },
});

export const { setPosts, appendPosts } = postsSlice.actions;
export default postsSlice.reducer;

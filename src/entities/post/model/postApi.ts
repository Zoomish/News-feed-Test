import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostsResponse } from "../types";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getPosts: builder.query<PostsResponse, { limit: number; skip: number }>(
            {
                query: ({ limit, skip }) =>
                    `/posts?limit=${limit}&skip=${skip}`,
            },
        ),
    }),
});

export const { useGetPostsQuery } = postApi;

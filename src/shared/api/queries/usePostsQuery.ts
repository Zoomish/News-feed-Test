import { Post } from "@/entities/post/types";
import { $axios } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetPostsResponse = { posts: Post[]; total: number };

type UsePostsQueryParams = {
    page: number;
    limit: number;
    searchTerm: string;
    searchType: "search" | "tag";
};

export const usePostsQuery = ({
    page,
    limit,
    searchTerm,
    searchType,
}: UsePostsQueryParams) => {
    const skip = page * limit;

    const fetchPosts = async (): Promise<GetPostsResponse> => {
        let endpoint = "";

        if (!searchTerm) {
            endpoint = `/posts?limit=${limit}&skip=${skip}`;
        } else if (searchType === "search") {
            endpoint = `/posts/search?q=${encodeURIComponent(searchTerm)}`;
        } else if (searchType === "tag") {
            endpoint = `/posts/tag/${encodeURIComponent(searchTerm)}`;
        }

        const { data } = await $axios.get(endpoint);
        return data;
    };

    return useQuery<GetPostsResponse>({
        queryKey: ["posts", searchTerm, searchType, page],
        queryFn: fetchPosts,
    });
};

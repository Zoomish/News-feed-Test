import { Post } from "@/entities/post/types";
import { $axios } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetPostsResponse = { posts: Post[]; total: number };

type UsePostsQueryParams = {
    page: number;
    limit: number;
    searchTerm: string;
    searchType: string;
    enabled: boolean;
};

export const usePostsQuery = ({
    page,
    limit,
    searchTerm,
    searchType,
    enabled = true,
}: UsePostsQueryParams) => {
    const skip = page * limit;
    let endpoint = "";

    if (searchType === "search" && searchTerm.length > 0) {
        endpoint = `/posts/search?q=${encodeURIComponent(
            searchTerm,
        )}&limit=${limit}&skip=${skip}`;
    } else if (searchType === "tag") {
        endpoint = `/posts/tag/${encodeURIComponent(
            searchTerm,
        )}?limit=${limit}&skip=${skip}`;
    } else {
        endpoint = `/posts?limit=${limit}&skip=${skip}`;
    }

    return useQuery<GetPostsResponse>({
        queryKey: ["posts", searchTerm, searchType, page],
        queryFn: async () => {
            const { data } = await $axios.get(endpoint);
            return data;
        },
        enabled,
    });
};

"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";
import { $axios } from "@/shared/api/axios";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
    setSearchResults,
    clearSearchResults,
} from "@/entities/post/model/searchSlice";

export const HeaderComponent: React.FC = () => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const searchPosts = async () => {
            if (!debouncedQuery) {
                dispatch(clearSearchResults());
                return;
            }

            try {
                const response = await $axios.get("/posts/search", {
                    params: { q: debouncedQuery },
                });

                dispatch(setSearchResults(response.data.posts || []));
            } catch (error) {
                console.error("Ошибка при поиске:", error);
                dispatch(clearSearchResults());
            }
        };

        searchPosts();
    }, [debouncedQuery, dispatch]);

    return (
        <div className="p-4 bg-white shadow-md">
            <Input
                placeholder="Поиск постов..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                allowClear
            />
        </div>
    );
};

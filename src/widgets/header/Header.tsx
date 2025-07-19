"use client";

import { setSearchTerm } from "@/features/search/model/searchSlice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Input } from "antd";
import { debounce } from "lodash";
import { useCallback } from "react";

export const HeaderComponent = () => {
    const dispatch = useAppDispatch();

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(setSearchTerm(value));
        }, 400),
        [],
    );

    return (
        <div className="p-4 border-b">
            <Input
                placeholder="Поиск постов..."
                onChange={(e) => debouncedSearch(e.target.value)}
                allowClear
            />
        </div>
    );
};

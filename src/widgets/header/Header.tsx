"use client";
import { setSearchTerm } from "@/features/search/model/searchSlice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Input } from "antd";
import { useRef } from "react";

export const HeaderComponent = () => {
    const dispatch = useAppDispatch();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            dispatch(setSearchTerm(value));
        }, 400);
    };

    return (
        <div className="p-4 border-b">
            <Input
                placeholder="Поиск постов..."
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
            />
        </div>
    );
};

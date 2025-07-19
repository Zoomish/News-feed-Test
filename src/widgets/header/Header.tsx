"use client";

import { RootState } from "@/app/store";
import { setSearchTerm } from "@/features/search/model/searchSlice";
import { Flex, Input, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (search.type === "tag") {
            setInputValue("");
        }
    }, [search.type]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.trim() !== "") {
                dispatch(
                    setSearchTerm({ term: inputValue.trim(), type: "search" }),
                );
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const setDefaultSearch = () => {
        dispatch(setSearchTerm({ term: "", type: "search" }));
    };

    return (
        <Flex justify="center" gap={8} style={{ marginTop: 16 }}>
            {search.type === "tag" && (
                <Tag
                    className="cursor-pointer flex items-center"
                    color="purple"
                    onClick={setDefaultSearch}
                    closable
                    onClose={setDefaultSearch}
                >
                    {search.term}
                </Tag>
            )}
            <Input
                placeholder="Search posts"
                className="max-w-[800px]"
                value={inputValue}
                onChange={handleChange}
                onClear={setDefaultSearch}
                allowClear
            />
        </Flex>
    );
};

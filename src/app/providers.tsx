"use client";

import { store } from "@/app/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

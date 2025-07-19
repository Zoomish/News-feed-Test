"use client";
import { store } from "@/app/store";
import { App, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <App>
                <Layout>
                    <Header>Header</Header>
                    <Content>{children}</Content>
                </Layout>
            </App>
        </Provider>
    );
};

"use client";
import { store } from "@/app/store";
import { HeaderComponent } from "@/widgets/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App className="min-h-screen">
                    <Layout className="min-h-screen">
                        <Header
                            style={{
                                position: "fixed",
                                zIndex: 1,
                                width: "100%",
                                backgroundColor: "transparent",
                            }}
                        >
                            <HeaderComponent />
                        </Header>
                        <Content style={{ padding: "0 50px", marginTop: 64, minHeight: "100%" }}>
                            {children}
                        </Content>
                    </Layout>
                </App>
            </Provider>
        </QueryClientProvider>
    );
};

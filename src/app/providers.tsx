"use client";
import { store } from "@/app/store";
import { HeaderComponent } from "@/widgets/header/Header";
import { App, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <App>
                <Layout>
                    <Header
                        style={{
                            position: "fixed",
                            zIndex: 1,
                            width: "100%",
                            backgroundColor: "transparent",
                        }}
                    >
                        <HeaderComponent></HeaderComponent>
                    </Header>
                    <Content style={{ padding: "0 50px", marginTop: 64 }}>
                        {children}
                    </Content>
                </Layout>
            </App>
        </Provider>
    );
};

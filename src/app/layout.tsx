import { store } from "@/app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import "./globals.css";

export const metadata: Metadata = {
    title: "News Feed",
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <ConfigProvider>{children}</ConfigProvider>
                    </QueryClientProvider>
                </Provider>
            </body>
        </html>
    );
}

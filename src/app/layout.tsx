import "./globals.css";
import { AppProviders } from "./providers";

export const metadata = {
    title: "News Feed",
    description: "Infinite scroll with Next.js",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}

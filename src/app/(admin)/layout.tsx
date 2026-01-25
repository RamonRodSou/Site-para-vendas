import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Header } from "../../components/layout/header";
import { QueryProvider } from "../../provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <QueryProvider>
                <body className={cn(inter.className, "bg-slate-50 antialiased text-slate-900")}>
                    {children}
                </body>
            </QueryProvider>

        </html>
    );
}
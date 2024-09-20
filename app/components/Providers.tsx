"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

interface ProviderProps {
    children: ReactNode
}

const queryClient = new QueryClient()
export const Providers: FC<ProviderProps> = ({children}) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
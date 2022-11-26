import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryClientWrapperProps {
  queryClient: QueryClient;
}

export const QueryClientWrapper = ({
  queryClient,
  children,
}: PropsWithChildren<QueryClientWrapperProps>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

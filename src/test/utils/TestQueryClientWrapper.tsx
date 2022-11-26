import { PropsWithChildren } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientWrapper } from "../../components/utils/QueryClientWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const TestQueryClientWrapper = ({ children }: PropsWithChildren<{}>) => (
  <QueryClientWrapper queryClient={queryClient}>{children}</QueryClientWrapper>
);

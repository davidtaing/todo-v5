import { PropsWithChildren } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientWrapper } from "../../components/utils/QueryClientWrapper";

const defaultOptions = {
  queries: {
    retry: false,
  },
};

export const TestQueryClientWrapper = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientWrapper queryClient={queryClient}>
      {children}
    </QueryClientWrapper>
  );
};

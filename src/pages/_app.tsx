import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientWrapper } from "../components/utils/QueryClientWrapper";

if (process.env.NODE_ENV !== "production") {
  require("../mocks");
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientWrapper queryClient={queryClient}>
      <Component {...pageProps} />
    </QueryClientWrapper>
  );
}

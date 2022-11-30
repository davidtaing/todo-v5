import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientWrapper } from "../components/utils/QueryClientWrapper";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

//const API_MOCKING = process.env.NODE_ENV !== "production";
const API_MOCKING = true;

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(API_MOCKING);

  useEffect(() => {
    async function initMocks() {
      const { initMocks } = await import("../mocks");
      await initMocks();
      setShouldRender(true);
    }

    if (API_MOCKING) {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <QueryClientWrapper queryClient={queryClient}>
      <Component {...pageProps} />
    </QueryClientWrapper>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";

if (process.env.NODE_ENV !== "production") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

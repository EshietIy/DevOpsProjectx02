import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
// This is a simple Next.js custom App component that renders the main application component.
// It receives the component and its props as arguments and returns the component with the props spread onto it.
// This allows for global styles and layout to be applied across all pages in the application.
// It does not include any additional logic or state management, making it a straightforward entry point for the Next.js application.
// This file is typically used to initialize pages and can be extended to include global styles, context providers, or other configurations as needed.
// It is located in the `pages/api` directory, which is not typical for a custom App component.
// Normally, the custom App component is placed in `pages/_app.tsx`.
// Ensure that this file is correctly placed in the `pages` directory for Next.js to recognize it as the custom App component.      
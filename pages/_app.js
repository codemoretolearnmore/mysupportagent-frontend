import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css"; // Ensure styles are correctly imported
import "../styles/upload.css"; // Importing external CSS
import "../styles/tickettable.css";
import "../styles/searchFilter.css"
import '../styles/loader.css'

// Create a new QueryClient instance
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

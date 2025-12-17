import { Provider } from "react-redux";
import "./App.css";
import "./components/ui/card/index.css";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/Store";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HomePage  />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

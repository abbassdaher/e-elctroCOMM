import { Provider } from "react-redux";
import "./App.css";
import "./components/ui/card/index.css";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/Store";
import NavBar from "./components/ui/NavBar";
import AboutPages from "./pages/AboutPages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/about" element={<AboutPages />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

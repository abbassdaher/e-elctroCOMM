import { Provider } from "react-redux";
import "./App.css";
import "./components/ui/card/index.css";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/Store";
import NavBar from "./components/ui/NavBar";
import AboutPages from "./pages/AboutPages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPages />} />
            <Route path="product/:id" element={<ProductInfo />} />
          </Routes>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

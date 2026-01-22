import { Provider } from "react-redux";
import "./App.css";

import "./components/ui/card/index.css";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/Store";
import NavBar from "./components/ui/NavBar";
import AboutPages from "./pages/AboutPages";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";
import SignInSignUp from "./pages/SignInSignUp";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <ChakraProvider value={defaultSystem}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NavBar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPages />} />
              <Route path="product/:id" element={<ProductInfo />} />
              <Route path="/signIn-Up" element={<SignInSignUp />} />

            </Routes>
          </QueryClientProvider>
        </Provider>
      </ChakraProvider>
    </Router>
  );
}

export default App;

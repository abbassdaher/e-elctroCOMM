import { Provider } from "react-redux";
import "./App.css";

import "./components/ui/card/index.css";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persister } from "./redux/Store";
import AboutPages from "./pages/AboutPages";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";
import SignInSignUp from "./pages/SignInSignUp";
import AppLayout from "./components/layout/AppLayout";
import { ColorModeProvider } from "./components/ui/color-mode";
import CookieServices from "./components/sevices/CookieServices";
import { PersistGate } from "redux-persist/integration/react";
import AdminDashboard from "./pages/dashboard";
import DashBoardLayout from "./pages/dashboard/DashBoardLayout";

function App() {
  const queryClient = new QueryClient();
  const token = CookieServices.getCookie("jwt");

  return (
    <Router>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              {/* <NavBar /> */}
              <PersistGate loading={<p>Loading...</p>} persistor={persister}>
                <Routes>
                  {/* app layout */}
                  <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPages />} />
                    <Route path="product/:id" element={<ProductInfo />} />
                  </Route>
                  {/* dashboard layout */}
                  <Route path="/dashboardLayout" element={<DashBoardLayout />}>
                    <Route index element={<AdminDashboard />} />
                  </Route>
                  {/* signin and signup */}
                  <Route
                    path="signIn-Up"
                    element={<SignInSignUp isauthenticated={token} />}
                  />
                </Routes>
              </PersistGate>
            </QueryClientProvider>
          </Provider>
        </ColorModeProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;

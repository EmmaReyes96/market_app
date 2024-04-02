import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@layout/Layout";
import Login from "@screens/auth/Login";
import Home from "@screens/home/Home";
import Products from "@screens/products/products";
import PublicRouteGuard from "@guard/public-route.guard";
import PrivateRouteGuard from "@guard/private-route.guard";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRouteGuard />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<PrivateRouteGuard />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="/products" element={<Products />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;

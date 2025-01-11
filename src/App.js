import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/auth/LogInPage";
import { HomePage } from "./pages/homePage/HomePage";
import {
  checkAuthLoader,
  DashBoardPage,
} from "./pages/dashboard/DashBoardPage";
import { CategoryPage } from "./pages/category/CategoryPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { RootLayout } from "./pages/RootLayout";
import { OrderPage } from "./pages/order/OrderPage";
import { OrderDetailPage } from "./pages/order/orderDetail/OrderDetailPage";
import { OrderOutlet } from "./pages/order/OrderOutlet";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":category", element: <CategoryPage /> },
      {
        path: "orders",
        element: <OrderOutlet />,
        children: [
          { index: true, element: <OrderPage /> },
          { path: ":orderId", element: <OrderDetailPage /> },
        ],
      },
    ],
  },
  { path: "login", element: <LoginPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { Button } from "ui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Wallets from "./pages/platform/Wallets";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { RequireAuth } from "./hooks/use-auth";
import CreateWallet from "./pages/platform/CreateWallet";
import Root from "./pages/platform/Root";
import Wallet from "./pages/platform/Wallet";
import Report from "./pages/platform/Report";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Wallets />,
      },
      {
        path: "wallets",
        element: <Wallets />,
      },
      {
        path: "add-wallet",
        element: <CreateWallet />,
      },
      {
        path: "wallet/:id",
        element: <Wallet />,
      },
      {
        path: "wallet/:id/report",
        element: <Report />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

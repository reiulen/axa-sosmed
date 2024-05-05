import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeIndex from "@/pages/Home/Index";
import AppLayout from "@/components/Layout/AppLayout";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: "",
        element: <HomeIndex />,
      },
    ],
  },
  {
    path: "*",
    element: <h2>Not Found</h2>,
  },
]);

export default function RouteApps() {
  return <RouterProvider router={router} />;
}

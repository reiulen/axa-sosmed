import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "",
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

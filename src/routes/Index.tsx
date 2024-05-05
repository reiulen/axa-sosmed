import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeIndex from "@/pages/Home/Index";
import AppLayout from "@/components/Layout/AppLayout";
import ProfileIndex from "@/pages/Profile/Index";
import ProfilPostinganIndex from "@/pages/Profile/Postingan/Index";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: "",
        element: <HomeIndex />,
      },
      {
        path: ":id",
        Component: ProfileIndex,
        children: [
          {
            path: "",
            element: <ProfilPostinganIndex />,
          },
          {
            path: "album",
            element: <h2>Album</h2>,
          },
        ],
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

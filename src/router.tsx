import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import ReportFraud from "@/pages/ReportFraud";
import ReportsList from "@/pages/ReportsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reportar-estafa",
    element: <ReportFraud />,
  },
  {
    path: "/reportes",
    element: <ReportsList />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

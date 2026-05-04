import { useRoutes } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";

import Login from "@/pages/Auth/Login";
import Dashboard from '@/pages/Dashboard';
import PelayananList from '@/pages/Pelayanan/List';
import PelayananUpload from '@/pages/Pelayanan/Upload';
import JualanApp from '@/pages/Jualan';

function Router() {
    const { token } = useAuth();
    const routesForPublic = [
        {
            path: "/",
            element: <JualanApp />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "*",
            element: <JualanApp />,
        },
    ];
    const routeUser = [
        {
            path: "/",
            element: <JualanApp />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "layanan",
            element: <PelayananList />,
        },
        {
            path: "/layanan/:categoryId/upload",
            element: <PelayananUpload />,
        },
        {
            path: "/jualan",
            element: <JualanApp />,
        },
    ];
    const routesForAuthenticatedOnly = routeUser;

    const routes = token ? routesForAuthenticatedOnly : routesForPublic;

    return useRoutes(routes);
}

export default Router;
